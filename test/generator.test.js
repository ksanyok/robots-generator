import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRobots, buildConfig, renderRobots, lintConfig, PRESETS, AI_CRAWLERS } from '../src/index.js';

const codes = (l) => l.map((i) => i.code);

test('default output allows everything', () => {
  const { text, issues } = generateRobots({ header: false, sitemaps: ['https://example.com/sitemap.xml'] });
  assert.equal(text, 'User-agent: *\nDisallow:\n\nSitemap: https://example.com/sitemap.xml\n');
  assert.deepEqual(issues, []);
});

test('presets, custom rules and dedupe', () => {
  const { text } = generateRobots({ preset: 'wordpress', disallow: ['private/', '/wp-admin/'], allow: ['/private/press/'], header: false });
  assert.match(text, /Allow: \/wp-admin\/admin-ajax\.php/);
  assert.match(text, /Disallow: \/private\//);
  assert.equal(text.match(/Disallow: \/wp-admin\//g).length, 1);
  assert.match(text, /Allow: \/private\/press\//);
  for (const name of Object.keys(PRESETS)) assert.ok(generateRobots({ preset: name }).text.includes('User-agent: *'), name);
  assert.throws(() => buildConfig({ preset: 'nope' }), /Unknown preset/);
});

test('blocks AI and SEO crawlers in their own groups', () => {
  const { text, config } = generateRobots({ blockAi: true, blockSeo: true, header: false });
  assert.equal(config.groups.length, 3);
  for (const bot of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot', 'AhrefsBot']) assert.match(text, new RegExp(`User-agent: ${bot}\\n`));
  assert.equal(config.groups[1].agents.length, AI_CRAWLERS.length);
});

test('crawl delay, host and extra groups', () => {
  const text = renderRobots(buildConfig({ crawlDelay: 5, host: 'example.com', extraGroups: [{ agents: ['Bingbot'], disallow: ['tmp'] }] }), { header: false });
  assert.match(text, /Crawl-delay: 5/);
  assert.match(text, /Host: example\.com/);
  assert.match(text, /User-agent: Bingbot\nDisallow: \/tmp/);
});

test('lints risky configurations', () => {
  const c = codes(lintConfig(buildConfig({ preset: 'staging', disallow: ['/wp-includes/', 'https://example.com/x', '/a b'], sitemaps: ['/sitemap.xml'], crawlDelay: 2 })));
  for (const code of ['blocks-everything', 'blocks-resources', 'absolute-path', 'whitespace', 'sitemap-relative', 'crawl-delay']) assert.ok(c.includes(code), code);
  assert.ok(codes(generateRobots().issues).includes('no-sitemap'));
});
