// be able to :
/*
/fixtures/ -> lists all fixtures
/fixtures/id -> lists fixture by team
/fixtures/delete
/fixtures/update
/fixtures/create
*/
const Fixture = require("../models/Fixture")

const asyncHandler = require("express-async-handler");

exports.fixture_list = asyncHandler(async(req,res,next)=>{
    const allFixtures = await Fixture.find({}, "team_1_name team_2_name").exec();
    res.send(allFixtures);
})
exports.fixture_detail = asyncHandler(async(req,res, next) =>{
    res.send(`Not implemented: fixture detail: ${req.params.id}`);
})

exports.fixture_create_get = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: fixture create GET");
});

exports.fixture_create_post = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: fixture create POST");
});

exports.fixture_delete_get = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: fixture delete GET");
});

exports.fixture_delete_post = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: fixture delete POST");
});

exports.fixture_update_get = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: fixture update GET");
});

exports.fixture_update_post = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: fixture update POST");
});