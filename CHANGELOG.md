# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-10-26

### Added
- `robots-generator` CLI with `--preset`, repeatable `--disallow`/`--allow`/`--sitemap`, `--block-ai`, `--block-seo`, `--crawl-delay`, `--config` JSON, `--out` and `--json`
- Presets: default, wordpress, woocommerce, shopify, magento, nextjs, laravel, staging
- Separate groups for 20 AI crawlers and 7 SEO crawlers
- Lint: blocking the whole site, blocking CSS/JS directories, full URLs as paths, whitespace in paths, relative sitemap URLs, crawl-delay note
- Library API (`generateRobots`, `buildConfig`, `renderRobots`, `lintConfig`, `PRESETS`, `AI_CRAWLERS`) and GitHub Action

[1.0.0]: https://github.com/ksanyok/robots-generator/releases/tag/v1.0.0
