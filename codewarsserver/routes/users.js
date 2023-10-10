var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//
router.get("/users/create", user_controller.user_create_get);

router.post("/users/create", user_controller.user_create_post);

router.get("/users", user_controller.user_list);

router.get("/users/:id", user_controller.user_detail);


module.exports = router;
