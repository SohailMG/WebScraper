const puppeteer = require("puppeteer");



async function scrapeChannel(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const [elm] = await page.$x('//*[@id="subscriber-count"]');
  const text = await elm.getProperty("textContent");
  const subs = await text.jsonValue();

  const [elm2] = await page.$x('//*[@id="text-container"]');
  const text2 = await elm2.getProperty("textContent");
  const formatedName = await text2.jsonValue();
  const name = formatedName.replace(/^\s+|\s+$/g, "");

  const [elm5] = await page.$x('//*[@id="video-title"]');
  const text5 = await elm5.getProperty("textContent");
  const popular = await text5.jsonValue();

  await page.goto((url += "/about"));
  const [elm3] = await page.$x(
    '//*[@id="right-column"]/yt-formatted-string[3]'
  );
  const text3 = await elm3.getProperty("textContent");
  const views = await text3.jsonValue();

  const [elm4] = await page.$x(
    '//*[@id="right-column"]/yt-formatted-string[2]'
  );
  const text4 = await elm4.getProperty("textContent");
  const joined = await text4.jsonValue();

  browser.close();
  return { subs, name, views, joined, popular };
};

module.exports = scrapeChannel
