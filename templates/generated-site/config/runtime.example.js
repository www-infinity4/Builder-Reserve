// Copy to config/runtime.js in a generated site and fill only PUBLIC values.
// Secrets belong in Cloudflare/server configuration, never in this file.
export const runtime = {
  siteId: 'replace-me',
  siteName: 'Replace Me',
  services: {
    starquest: null,
    commerceAnalytics: null
  },
  features: {
    wallet: true,
    commerce: false,
    share: true,
    collect: true
  }
};
