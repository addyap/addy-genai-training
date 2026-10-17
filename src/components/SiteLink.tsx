import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { useLocale, localizePath } from '@/i18n';
import { CONTACT_URL } from '@/lib/site';

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/** Link to a route of this site in the current language. '/contact' goes to the main site's form. */
const SiteLink = ({ to, ...props }: SiteLinkProps) => {
  const locale = useLocale();
  if (to === '/contact') return <a href={CONTACT_URL} {...props} />;
  return <Link to={localizePath(to, locale)} {...props} />;
};

export default SiteLink;
