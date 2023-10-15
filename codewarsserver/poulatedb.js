//my script to get json objs of games
//and populate the fixtures schema
console.log("This script populates some test fixtures into database");
const userArgs = process.argv.slice(2);
var fetch = require('node-fetch');
const Fixture = require("./models/Fixture");
const fixtures = []; //aggregation of all Fixtures
teams = ["afghanistan", "australia", "bangladesh", "england", "india", "netherlands", "new-zealand", "pakistan", "south-africa", "sri-lanka"]
baseFetchUrl = "https://fixturedownload.com/feed/json/icc-cricket-world-cup-2023/" //base url to fetch all teams info from
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("should be connected lolol");
    await createFixtures();

    console.log("Debug: Closing mongoose");
}

async function fixtureCreate(index, team1, team2, d_match, winner) {
    const fixtureDetail = {
        team_1_name: team1,
        team_2_name: team2,
        date_of_match: d_match,
        winner: winner,
    }

    const fixture = new Fixture(fixtureDetail);

    await fixture.save();
    fixtures[index] = fixture;

    console.log(`Added fixture: ${team1} vs ${team2}`);
}
async function createFixtures() {

    matchNumbers = new Set();

    for(var i = 0; i < teams.length; i ++){
        const response = await fetch(`${baseFetchUrl}${teams[i]}`);
        const output = await response.json();
        for (var j = 0; j < output.length; j ++){
            if(!matchNumbers.has(output[j].MatchNumber)){
                matchNumbers.add(output[j].MatchNumber);
                // console.log(`${output[j].MatchNumber} : ${output[j].HomeTeam} vs ${output[j].AwayTeam}`);
                await fixtureCreate(output[j].MatchNumber, output[j].HomeTeam, output[j].AwayTeam, output[j].DateUtc, false);
            }
        }
    }
}