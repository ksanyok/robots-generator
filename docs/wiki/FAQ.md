# FAQ

## Does blocking AI crawlers hurt my Google rankings?

No. Google-Extended only controls whether Google may use your content for Gemini and AI training; Googlebot, which crawls for search, is not blocked. The same applies to Applebot-Extended.

## Do AI crawlers respect robots.txt?

The major ones (OpenAI, Anthropic, Google, Apple, Perplexity, Common Crawl) document that they do. robots.txt is a convention, not access control — use authentication for content that must stay private.

## Should I block /wp-admin/?

Yes, but keep `/wp-admin/admin-ajax.php` allowed, because themes and plugins use it for front-end features. The WordPress preset does this.

## Can I keep a page out of Google with robots.txt?

No — Disallow stops crawling, not indexing. Use a `noindex` meta tag or header and allow crawling so Google can see it.

## Where does the file go?

At the root of the host: `https://example.com/robots.txt`. Each subdomain needs its own file.
