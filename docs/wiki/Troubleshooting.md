# Troubleshooting

## "may block CSS/JS that search engines need"

Google renders pages and needs your stylesheets and scripts. Remove that Disallow, or add Allow rules for the CSS/JS files.

## My rules are not applied to a specific bot

A crawler that has its own group ignores the `*` group. Add the rule to that group (via `extraGroups` in the config) as well.

## Verify the result

Check the deployed file and test URLs against it with the companion [robots-checker](https://github.com/ksanyok/robots-checker).

## Still stuck?

Open an [issue](https://github.com/ksanyok/robots-generator/issues/new/choose) with the command, the output (`--json` if possible) and your Node.js version — or compare with the [online version](https://promopilot.link/en/tools/robots-generator.php?utm_source=github&utm_medium=repo&utm_campaign=tools&utm_content=robots-generator).
