// be able to :
/*
/users/ -> users
/users/id -> lists predictions of user
/users/id/delete
/users/id/update (here they will update predictions)
/users/create // user/predictions/CRUD (later once basics works)
*/
const User = require("../models/User");
const Prediction = require("../models/Prediction")
const Fixture = require("../models/Fixture")

const asyncHandler = require("express-async-handler");
// const { body, validationResult } = require("express-validator");

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED user LIST");
});
exports.user_authenticate = asyncHandler(async (req, res, next) => {
  const {username, password} = req.body;
  try {
    const user = await User.authenticate(username, password);
    if (user){
      console.log("user authenticated");
      res.json(user);
    }
    else {
      console.log("here in case of wrong pass")
      res.status(400).json({error: "Invalid Credentials"});
    }
  }
  catch(error){
    console.log("errror");
    res.status(400).json({error: error.message})
  }


});
exports.user_detail = asyncHandler(async (req, res, next) => {
//   res.send(`Not implemented: user detail: ${req.params.id}`);
  //find by id and then return prediction list
  console.log("inside user detail")
  const allPredictions = await(User.findById(req.params.id)).exec();

  res.json(allPredictions);
});
exports.leaderboard_list_get = asyncHandler(async (req, res, next) => {
  //first i need to get all fixtures
  //then for each user I compare their predictions with the real results and then each user gets a score
  //then sort the users by score, also send the score through a json object back to the client

  const allFixtures = await Fixture.find({}, "team_1_name team_2_name winner").exec();
  const allUsers = await User.find({}, "username realPredictions").exec();

  var toSend = [];

  for(var i = 0; i < allUsers.length; i ++){
    var score = 0;
    for(var j = 0; j < allUsers[i].realPredictions.length; j ++){

        if(allUsers[i].realPredictions[j][1] == allFixtures[j].winner){
            score += 1;
        }
    }
    toSend.push({username: allUsers[i].username, score: score});
  }
  // Array.sort(toSend, (a,b)=> a.score.CompareTo(b.score))
  toSend.sort((a,b)=> b.score - a.score)
  console.log(toSend)
  res.json(toSend)
});
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user create GET");
});

exports.user_create_post = [
  // body("name")
  // .trim()
  // .isLength({ min: 1 })
  // .escape()
  // .withMessage("Username must be specified"),

  asyncHandler(async (req, res, next) => {
    //check if username already exists
    // console.log(req.body);
    const { username, email, password } = req.body;
    try{
      const user = User.signUp(username, email, password);
      await user.save();
      res.json(user);
    }
    catch(error){
      res.status(400).json({error: error.message})
    }
    
    

  }),
];

exports.user_get_user_data = [
  asyncHandler(async (req, res, next)=> {
    console.log(req.params);
    const data_with_name = await(User.find(req.params));

    // console.log(data_with_name);
    res.json(data_with_name);
  })
];

exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user delete GET");
});

exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user delete POST");
});

exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user update GET");
});

exports.user_update_post = asyncHandler(async (req, res, next) => {

  //here server will get the post request and handle sending the predictions
  //will receive userid, and an array of structs for predictions
  //compile predictions of user
  const listOfUserPredictions = req.body;
 //user id will be params.id 
 //prediction information will be req.body 
  array = new Array()
  for(var i = 0; i < listOfUserPredictions.length; i ++){
    //first find fixture that matches with the id;

    const fix = await Fixture.findById(req.body[i].id).exec();
    const predFixture = fix;
    const prediction = req.body[i].user_pred;
    const arr = [predFixture, prediction]
    array.push(arr); //appends all predictions to user 
  }
//   //find user and update the information for user
  // console.log(array)
  
  const q = await User.findByIdAndUpdate(req.params.id, {realPredictions : array}) //updating the predictions 
  res.send("done!");
});
