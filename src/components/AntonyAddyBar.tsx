import { useLocation } from "react-router-dom";
import { getLocaleFromPath } from "../i18n";

/**
 * Bar linking back to www.antonyaddy.com. The same bar (markup, CSS in the
 * global stylesheet under .aa-bar) sits at the top of every section and app
 * served under the main domain, so visitors can always find the hub and the
 * other services. The current service is marked with aria-current.
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
        <li><a href={`https://www.antonyaddy.com${t.ia}`} aria-current="true">{t.ai}</a></li>
        <li><a href={`https://www.antonyaddy.com${t.web}`}>{t.sites}</a></li>
      </ul>
      <a className="aa-bar-back" href="https://www.antonyaddy.com/">
        <span className="aa-bar-arrow" aria-hidden="true">←</span> antonyaddy.com
      </a>
      <a className="aa-bar-contact" href="https://www.antonyaddy.com/contact?sujet=ia">
        Contact
      </a>
    </nav>
  );
};

export default AntonyAddyBar;
