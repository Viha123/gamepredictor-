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
exports.user_detail = asyncHandler(async (req, res, next) => {
//   res.send(`Not implemented: user detail: ${req.params.id}`);
  //find by id and then return prediction list
  // console.log("inside user detail")
  const allPredictions = await(User.findById(req.params.id)).exec();
  // console.log(allPredictions.realPredictions)
  // // console.log(allPredictions.predictions)
  // for(var i = 0; i < allPredictions.realPredictions.length; i ++){
  //   // console.log("here?")
  //   // console.log(allPredictions.predictions[i]._id)
  //   // const p = await(Prediction.findById(allPredictions.predictions[i]))
  //   // console.log("done")
    
  //   console.log(p)
  // }
  // console.log("HEREEREEE")
  res.json(allPredictions);
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

    const user = new User({
      //during create they don't have an option to add predictions
      username: req.body.username,
      email: req.body.email,
      realPredictions: req.body.predictions,
    });
    await user.save().then(doc=>res.json(doc));
    

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
  // res.send("data here at correct route");
  // console.log(`update post received ${req.params.id}`);
  //here server will get the post request and handle sending the predictions
  //will receive userid, and an array of structs for predictions
  //compile predictions of user
  const listOfUserPredictions = req.body;

  // console.log(listOfUserPredictions);
  // console.log(listOfUserPredictions.length);
  // res.send(listOfUserPredictions)
 //user id will be params.id 
 //prediction information will be req.body 
  array = new Array()
  for(var i = 0; i < listOfUserPredictions.length; i ++){
    //first find fixture that matches with the id;
    // console.log(req.body[i].id)
    const fix = await Fixture.findById(req.body[i].id).exec();
    // console.log(fix)
    // const pred = new Prediction({
    //   fixutre: fix,
    //   prediction: req.body[i].user_pred,
    // })
    const predFixture = fix;
    const prediction = req.body[i].user_pred;
    const arr = [predFixture, prediction]
    // console.log(pred)
    array.push(arr); //appends all predictions to user 
  }
//   //find user and update the information for user
  // console.log(array)
  
  const q = await User.findByIdAndUpdate(req.params.id, {realPredictions : array}) //updating the predictions 
  res.send("done!");
});
