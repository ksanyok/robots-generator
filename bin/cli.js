#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { generateRobots, PRESETS, AI_CRAWLERS } from '../src/index.js';

const HELP = `Usage: robots-generator [options]

Generates a robots.txt from a platform preset and your own rules, optionally
blocking AI and SEO crawlers, and checks it for common mistakes.

Options:
  -p, --preset <name>    ${Object.keys(PRESETS).join(', ')} (default: default)
  -d, --disallow <path>  Add a Disallow rule for all crawlers (repeatable)
  -a, --allow <path>     Add an Allow rule for all crawlers (repeatable)
  -s, --sitemap <url>    Add a Sitemap line (repeatable)
  --block-ai             Block ${AI_CRAWLERS.length} AI crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot…)
  --block-seo            Block third-party SEO crawlers (AhrefsBot, SemrushBot…)
  --crawl-delay <s>      Crawl-delay for all crawlers (Bing, Yandex)
  --config <file>        Read options from a JSON file
  -o, --out <file>       Write to a file instead of standard output
  --no-header            Omit the generator comment
  --json                 Print config, text and issues as JSON
  -h, --help             Show this help

Online version (no install): https://promopilot.link/en/tools/robots-generator.php?utm_source=github&utm_medium=cli&utm_campaign=tools&utm_content=robots-generator
`;

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) { process.stdout.write(HELP); process.exit(0); }

const opts = { disallow: [], allow: [], sitemaps: [] };
let out;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  const next = () => args[++i];
  if (a === '-p' || a === '--preset') opts.preset = next();
  else if (a === '-d' || a === '--disallow') opts.disallow.push(next());
  else if (a === '-a' || a === '--allow') opts.allow.push(next());
  else if (a === '-s' || a === '--sitemap') opts.sitemaps.push(next());
  else if (a === '--block-ai') opts.blockAi = true;
  else if (a === '--block-seo') opts.blockSeo = true;
  else if (a === '--crawl-delay') opts.crawlDelay = Number(next());
  else if (a === '--config') Object.assign(opts, JSON.parse(readFileSync(next(), 'utf8')));
  else if (a === '-o' || a === '--out') out = next();
  else if (a === '--no-header') opts.header = false;
}

const color = process.stderr.isTTY && !process.env.NO_COLOR;
const c = (code, s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const ICON = { error: c(31, '✖'), warning: c(33, '!'), info: c(36, 'i') };

try {
  const r = generateRobots(opts);
  if (args.includes('--json')) { console.log(JSON.stringify(r, null, 2)); process.exit(r.issues.some((i) => i.level === 'error') ? 1 : 0); }
  if (out) { writeFileSync(out, r.text); console.error(c(32, `✔ Wrote ${out}`)); } else process.stdout.write(r.text);
  for (const i of r.issues) console.error(`${ICON[i.level]} ${i.message}`);
  process.exit(r.issues.some((i) => i.level === 'error') ? 1 : 0);
} catch (err) {
  console.error(c(31, `Error: ${err.message}`));
  process.exit(2);
}
