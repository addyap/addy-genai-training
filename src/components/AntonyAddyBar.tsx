import { useLocation } from "react-router-dom";
import { getLocaleFromPath } from "../i18n";

/**
 * The shared top bar: the one global navigation on every section and app
 * served under www.antonyaddy.com (markup and .aa-bar CSS are copied, not
 * imported, so keep them identical across projects). The logo goes to the
 * hub; the three activities always appear in the hub's order (English,
 * websites, AI) with the current one marked. No contact button here: each
 * section's own header carries its enquiry action.
 * Labels follow the page's locale (/en pages get English).
 */
const LABELS = {
  fr: { english: "Anglais", ai: "IA", sites: "Sites web", ia: "/ia", web: "/sites-web" },
  en: { english: "English", ai: "AI", sites: "Websites", ia: "/ia/en", web: "/sites-web/en" },
};

const AntonyAddyBar = () => {
  const locale = getLocaleFromPath(useLocation().pathname);
  const t = LABELS[locale];
  return (
    <nav className="aa-bar" aria-label="Antony Addy">
      <a className="aa-bar-home" href="https://www.antonyaddy.com/">
        <img className="aa-bar-mark" src="https://www.antonyaddy.com/brand/antony-addy-logo-white.svg" alt="Antony Addy" width={47} height={24} />
      </a>
      <ul className="aa-bar-services" lang={locale}>
        <li><a href="https://www.antonyaddy.com/offres-de-formation">{t.english}</a></li>
        <li><a href={`https://www.antonyaddy.com${t.web}`}>{t.sites}</a></li>
        <li><a href={`https://www.antonyaddy.com${t.ia}`} aria-current="true">{t.ai}</a></li>
      </ul>
    </nav>
  );
};

export default AntonyAddyBar;
