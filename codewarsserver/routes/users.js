var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");


//all of these have prefix that are users
router.get("/create", user_controller.user_create_get);

router.post("/create", user_controller.user_create_post);
router.get("/", user_controller.user_list);
router.get("/:id", user_controller.user_detail);

router.get("/:id/update", user_controller.user_update_get);
router.post("/:id/update", user_controller.user_update_post);

router.get("/:id/delete", user_controller.user_delete_get);
router.post("/:id/delete", user_controller.user_delete_post);

router.get("/data/:username", user_controller.user_get_user_data);
module.exports = router;
