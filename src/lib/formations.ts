// Cross-site links to Antony Addy's three training domains. antonyaddy.com is
// the hub; this site (IA) is one of the three. The entry with external:false is
// the current site. Mirror of the same file on the English (antonyaddy.com) and
// SAP sites — keep the three in sync when wording or URLs change.

export interface Formation {
  key: 'anglais' | 'ia' | 'sap';
  navLabel: string;
  href: string;
  external: boolean;
  icon: 'Globe' | 'Sparkles' | 'Settings';
  /** Short domain shown as a subtitle in the switcher. */
  domain: string;
}

export const FORMATIONS: Formation[] = [
  {
    key: 'anglais',
    navLabel: 'Anglais professionnel',
    href: 'https://antonyaddy.com',
    external: true,
    icon: 'Globe',
    domain: 'antonyaddy.com',
  },
  {
    key: 'ia',
    navLabel: 'Intelligence Artificielle',
    href: '/',
    external: false,
    icon: 'Sparkles',
    domain: 'Ce site',
  },
  {
    key: 'sap',
    navLabel: 'SAP',
    href: 'https://sap.antonyaddy.com',
    external: true,
    icon: 'Settings',
    domain: 'sap.antonyaddy.com',
  },
];
