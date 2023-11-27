// be able to :
/*
/users/ -> users
/users/id -> lists predictions of user
/users/id/delete
/users/id/update (here they will update predictions)
/users/create // user/predictions/CRUD (later once basics works)
*/
const User = require("../models/User");

const asyncHandler = require("express-async-handler");
// const { body, validationResult } = require("express-validator");

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED user LIST");
});
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not implemented: user detail: ${req.params.id}`);
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
    console.log(req.body);

    const user = new User({
      //during create they don't have an option to add predictions
      username: req.body.username,
      email: req.body.email,
      predictions: req.body.predictions,
    });
    await user.save().then(doc=>res.json(doc));
    

  }),
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
  res.send("NOT IMPLEMENTED: user update POST");
});
