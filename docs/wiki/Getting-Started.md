# Getting started

## Requirements

Node.js 18 or newer. No other dependencies.

## Install

```bash
# one-off run
npx github:ksanyok/robots-generator --preset wordpress --block-ai

# global CLI
npm install -g github:ksanyok/robots-generator

# as a library in your project
npm install github:ksanyok/robots-generator
```

## First run

```bash
robots-generator --preset wordpress --block-ai
```

The generated file is written to standard output (or to the file given with `--out`); lint messages go to standard error, so piping the output stays clean. `!` warnings flag risky rules, `✖` errors mean a rule will not work as intended (exit code 1).

## Exit codes

| Code | Meaning |
|---|---|
| 0 | No errors (warnings allowed unless `--strict`) |
| 1 | Errors found (or warnings with `--strict`) |
| 2 | Bad arguments or the check could not run |

## More examples

**A Shopify-style store that also blocks SEO bots**

```bash
robots-generator -p shopify --block-seo -s https://shop.example.com/sitemap.xml -o robots.txt
```

**Staging: block everything**

```bash
robots-generator -p staging -o public/robots.txt
```

**From a JSON config kept in your repo**

```bash
robots-generator --config robots.config.json -o public/robots.txt
```

## Without installing anything

Use the [online Robots.txt Generator](https://promopilot.link/en/tools/robots-generator.php?utm_source=github&utm_medium=repo&utm_campaign=tools&utm_content=robots-generator).
