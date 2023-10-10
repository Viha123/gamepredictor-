var express = require('express');
var router = express.Router();

const fixture_controller = require("../controllers/fixtureController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("WELCOME TO VIHAS AWESOME PAGE CUZ VIHA IS SUPER KOOOOL :D");
});
//stuff related to fixtures
router.get("/fixtures/create", fixture_controller.fixture_create_get);
router.post("/fixtures/create", fixture_controller.fixture_create_post);

router.get("/fixtures/:id/delete", fixture_controller.fixture_delete_get);
router.post("/fixtures/:id/delete", fixture_controller.fixture_delete_post);

router.get("/fixtures/:id/update", fixture_controller.fixture_update_get);
router.post("/fixtures/:id/update", fixture_controller.fixture_update_post);



router.get("/fixtures", fixture_controller.fixture_list);


module.exports = router;
