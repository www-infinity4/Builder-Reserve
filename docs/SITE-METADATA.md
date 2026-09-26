# Site metadata and return-link contract

Every generated public site must ship with a human title and description, canonical URL, Open Graph metadata and X/Twitter card metadata.

Shared content should return users to the generated site context. Merchant destinations remain merchant actions; they are not substitutes for the site's canonical/share URL.

Required output:
- title
- description
- canonical URL
- og:type, og:title, og:description, og:url, og:image
- twitter:card, twitter:title, twitter:description, twitter:image
- a stable preview asset

Do not use raw upload filenames such as `file.jpg` as share titles. A product share may mention the product, but the return URL should preserve the Santa/site context when the product action is intended to promote the generated site.
