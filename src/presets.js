/** AI and LLM crawlers that publish a robots.txt user-agent token. */
export const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'Google-Extended',
  'Applebot-Extended', 'PerplexityBot', 'Perplexity-User', 'CCBot', 'Bytespider', 'meta-externalagent', 'Amazonbot',
  'cohere-ai', 'Diffbot', 'YouBot', 'Timpibot', 'omgili',
];

/** Aggressive SEO/backlink crawlers some sites prefer to block. */
export const SEO_CRAWLERS = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'DataForSeoBot', 'serpstatbot'];

/** Ready-made rule sets for popular platforms. */
export const PRESETS = {
  default: { groups: [{ agents: ['*'], disallow: [], allow: [] }] },
  wordpress: { groups: [{ agents: ['*'], disallow: ['/wp-admin/', '/wp-login.php', '/?s=', '/search/', '/*?replytocom='], allow: ['/wp-admin/admin-ajax.php'] }] },
  woocommerce: { groups: [{ agents: ['*'], disallow: ['/wp-admin/', '/cart/', '/checkout/', '/my-account/', '/*?add-to-cart=', '/*?orderby=', '/?s='], allow: ['/wp-admin/admin-ajax.php'] }] },
  shopify: { groups: [{ agents: ['*'], disallow: ['/admin', '/cart', '/orders', '/checkouts/', '/checkout', '/account', '/search', '/*?*oseid=', '/collections/*+*'], allow: [] }] },
  magento: { groups: [{ agents: ['*'], disallow: ['/checkout/', '/customer/', '/catalogsearch/', '/wishlist/', '/sendfriend/', '/*?dir=', '/*?mode=', '/*?SID='], allow: [] }] },
  nextjs: { groups: [{ agents: ['*'], disallow: ['/api/'], allow: ['/_next/static/', '/_next/image'] }] },
  laravel: { groups: [{ agents: ['*'], disallow: ['/admin/', '/login', '/register', '/password/'], allow: [] }] },
  staging: { groups: [{ agents: ['*'], disallow: ['/'], allow: [] }] },
};
