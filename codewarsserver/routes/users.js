var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// //
//all of these have prefix that are users
router.get("/create", user_controller.user_create_get);

router.post("/create", user_controller.user_create_post);

router.get("/", user_controller.user_list);
router.get("/:id", user_controller.user_detail);


module.exports = router;
