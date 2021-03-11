const puppeteer = require("puppeteer");

let url = "https://reelgood.com/curated/trending-picks";


/**
 * scrapes a web page for titles tredning tv shows
 * @returns an array of  five show titles
 */
async function getTrending() {

  // creating browser instance 
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // navigating to web page
  await page.goto("https://reelgood.com/curated/trending-picks");

  // evaluating html of page then selecting all title tags
  const trending = await page.evaluate(() => {
      let arr = document.querySelectorAll('.css-1u7zfla  > a');
      let elms = [];
      for (let i = 0; i < arr.length; i++) {
          let element = arr[i].innerText;
          elms.push(element);       
      }

    return  elms.slice(0,6);

    }).then(titles => { return titles } )
    browser.close();
    return trending;
    // return data;
};

module.exports=getTrending;
