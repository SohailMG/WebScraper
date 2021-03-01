const puppeteer = require("puppeteer");

let url = "https://reelgood.com/curated/trending-picks/on-netflix";

async function getTrending() {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://reelgood.com/curated/trending-picks/on-netflix");

  const trending = await page.evaluate(() => {
      let arr = document.querySelectorAll('.css-1u7zfla  > a');
      let elms = [];
      for (let i = 0; i < arr.length; i++) {
          let element = arr[i].innerText;
          elms.push(element);       
      }

    return  elms.slice(0,6);

    }).then(token => { return token } )
    browser.close();
    return trending;
    // return data;
};

module.exports=getTrending;
