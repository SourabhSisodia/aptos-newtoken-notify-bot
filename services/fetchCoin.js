import axios from "axios";
import * as cheerio from "cheerio";

import { setTimeout } from "node:timers/promises";
import puppeteer from "puppeteer-extra";
import createPuppeteerStealth from "puppeteer-extra-plugin-stealth";

const puppeteerStealth = createPuppeteerStealth();

export const fetchCoins = async () => {
  puppeteerStealth.enabledEvasions.delete("user-agent-override"); // <-- Only for Linux
  puppeteer.use(puppeteerStealth);

  puppeteer
    .launch({
      headless: false,
      targetFilter: (target) => target.type() !== "other",
    })
    .then(async (browser) => {
      console.log("Running tests..");
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      await page.goto(
        "https://dexscreener.com/new-pairs?rankBy=trendingScoreH1&order=desc&chainIds=aptos&minLiq=1000&maxAge=200"
      );
      await setTimeout(5000);
      const data = await page.content();
      const $ = cheerio.load(data);

      console.log($(".ds-dex-table-empty").text());
    });
};
