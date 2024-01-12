const puppeteer = require("puppeteer");
const preparePageForTests = async (page) => {

  // Pass the User-Agent Test.
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
  }
  
const getWinners = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();
    await preparePageForTests(page);

  page.on('console', message => {
    console.log(`Page log: ${message.text()}`);
  });
    
  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.espncricinfo.com/records/tournament/team-match-results/icc-cricket-world-cup-2023-24-15338/", {
    waitUntil: "domcontentloaded",
  });
  // await page.waitForSelector('dr.ds-text-title-xs.ds-font-bold');
  await page.waitForSelector('tr.ds-bg-ui-fill-translucent');
  const data = await page.evaluate(()=> {
    // const firstRow = document.querySelector("thead.ds-bg-fill-content-alternate.ds-text-left"); //this is in blue for some odd reason
    const firstRow = document.querySelector("tr.ds-bg-ui-fill-translucent");
    const ele1 = firstRow.querySelector("td.ds-min-w-max").querySelector('span').innerText;
    const ele2 = firstRow.querySelectorAll("td.ds-min-w-max.ds-text-right")
    console.log(ele2)
    // const team1 = firstRow.querySelector("ds-min-w-max").innerText;
    // const team2 = firstRow.querySelector("ds-min-w-max ds-text-right").innerText;
    console.log(firstRow);
    return {ele1, ele2};
  })
  // const quotes = await page.evaluate(() => {
  //   // Fetch the first element with class "quote"
  //   const quote = document.querySelector(".quote");

  //   // Fetch the sub-elements from the previously fetched quote element
  //   // Get the displayed text and return it (`.innerText`)
  //   const text = quote.querySelector(".text").innerText;
  //   const author = quote.querySelector(".author").innerText;

  //   return { text, author };
  // });

  console.log(data);
  await browser.close();
};
// Start the scraping
getWinners();