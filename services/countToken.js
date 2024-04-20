import * as cheerio from "cheerio";
import { sendMail } from "./sendMail.js";

let tokenCount = 0;
export const countToken = async (data) => {
  const $ = cheerio.load(data);
  let newTokenCount = await $(".ds-dex-table-row");
  if (newTokenCount) {
    sendMail();
  }
};
