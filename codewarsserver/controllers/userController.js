// be able to :
/*
/users/ -> users
/users/id -> lists predictions of user
/users/id/delete
/users/id/update (here they will update predictions)
/users/create // user/predictions/CRUD (later once basics works)
*/
const User = require("../models/User")

const asyncHandler = require("express-async-handler");

exports.user_list = asyncHandler(async(req,res,next)=>{
    res.sent("NOT IMPLEMENTED user LIST");
})
exports.user_detail = asyncHandler(async(req,res, next) =>{
    res.send(`Not implemented: user detail: ${req.params.id}`);
})

exports.user_create_get = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: user create GET");
});

exports.user_create_post = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: user create POST");
});

exports.user_delete_get = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: user delete GET");
});

exports.user_delete_post = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: user delete POST");
});

exports.user_update_get = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: user update GET");
});

exports.user_update_post = asyncHandler(async(req, res, next) =>{
    res.send("NOT IMPLEMENTED: user update POST");
});