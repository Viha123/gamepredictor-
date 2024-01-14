var fetch = require('node-fetch');
const Fixture = require("./models/Fixture");
const puppeteer = require("puppeteer");

const preparePageForTests = async (page) => {

  // Pass the User-Agent Test.
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
  }
  

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://sviha195:JeA90LX2Edhloa5U@sandbox.bnjpbzw.mongodb.net/gamewars?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
// console.log(theStuff);
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("should be connected lolol");
  const winners = await getWinners()
  // console.log(winners);
  await fixturesUpdate(winners);
  console.log("Debug: Closing mongoose");
  await mongoose.connection.close();

}
async function fixturesUpdate(winners) {
  // console.log(winners);
  for(let i = 0; i < winners.length; i ++){
    var query, query2;
    query = await Fixture.findOne({team_1_name: winners[i].team1, team_2_name: winners[i].team2}).exec();
    if(!query){
      query2 = await Fixture.findOne({team_1_name: winners[i].team2, team_2_name: winners[i].team1}).exec();
      await updateFix(winners[i], query2)
    }
    else{
      await updateFix(winners[i],query);
    }
  }
}
async function updateFix(ithwinner, query){
  if (ithwinner.winner.toLowerCase() === query.team_1_name.toLowerCase() || ithwinner.winner.toLowerCase() === query.team_2_name.toLowerCase() || ithwinner.winner.toLowerCase() === "Tie".toLowerCase()){
    //only then is it valid
    const q = await Fixture.findByIdAndUpdate(query._id, {winner : ithwinner.winner})
  }
}
const getWinners = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: "new",
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
    var array = [];
    const regularRow = document.querySelectorAll("tr");
    for(var i = 1; i < regularRow.length; i ++){
      //all trs
      //for each row get the first 3 columns
      //col 1 is diff from col 2 and 3
      const team1 = regularRow[i].querySelector("td.ds-min-w-max").querySelector('span').innerText;
      const team2 = regularRow[i].querySelectorAll("td.ds-min-w-max.ds-text-right")[0].querySelector('span').innerText;
      const winner = regularRow[i].querySelectorAll("td.ds-min-w-max.ds-text-right")[1].querySelector('span').innerText;
      // console.log(team1, team2, winner);
      array.push({team1, team2, winner})
    }

    return array;
  })
  // console.log(data);
  await browser.close();
  return data;
};
// Start the scraping
