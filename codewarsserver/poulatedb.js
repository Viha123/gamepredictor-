//my script to get json objs of games
//and populate the fixtures schema

console.log("This script populates some test fixtures into database");

const userArgs = process.argv.slice(2);

const Fixture = require("./models/Fixture");

const fixtures = []; //aggregation of all Fixtures

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
    console.log("Adding fixtures");
    await Promise.all([
        fixtureCreate(0, "testteam1", "testteam2", "2023-10-10", false),
        fixtureCreate(1, "testteam3", "testteam4", "2023-10-8", "testteam3")
    ]);
}