/**
 * Slim bar linking back to www.antonyaddy.com. The same bar (markup, CSS in
 * the global stylesheet under .aa-bar) sits at the top of every section and
 * app served under the main domain, so visitors can always find the hub.
 */
const AntonyAddyBar = () => (
  <nav className="aa-bar" aria-label="Antony Addy">
    <a className="aa-bar-home" href="https://www.antonyaddy.com/">
      <img className="aa-bar-mark" src="https://www.antonyaddy.com/brand/antony-addy-arrow.svg" alt="" width={18} height={14} />
      <strong>Antony Addy</strong>
      <span className="aa-bar-sub">Anglais · IA · Sites web · antonyaddy.com</span>
    </a>
    <a className="aa-bar-contact" href="https://www.antonyaddy.com/contact?sujet=ia">
      Contact
    </a>
  </nav>
);

export default AntonyAddyBar;
