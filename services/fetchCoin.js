import axios from "axios";

import { setTimeout } from "node:timers/promises";
import puppeteer from "puppeteer-extra";
import createPuppeteerStealth from "puppeteer-extra-plugin-stealth";
import { countToken } from "./countToken.js";

const puppeteerStealth = createPuppeteerStealth();

// this function fetches coins data
export const fetchCoins = async () => {
  puppeteerStealth.enabledEvasions.delete("user-agent-override"); // <-- Only for Linux
  puppeteer.use(puppeteerStealth);

  const browser = await puppeteer.launch({
    headless: false,
    targetFilter: (target) => target.type() !== "other",
  });

  console.log("Running tests..");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(
    "https://dexscreener.com/new-pairs?rankBy=trendingScoreH1&order=desc&chainIds=aptos&minLiq=1000&maxAge=1000"
  );
  await setTimeout(5000);
  const data = await page.content();
  countToken(data);
  browser.close();
};
