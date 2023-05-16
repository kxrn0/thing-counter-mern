const express = require("express");
const router = express.Router();
const counterController = require("../controllers/counterController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { require_auth } = require("../middleware/require_auth");

router.use(require_auth);

router.post("/get-page", counterController.get_page);

router.get("/description/:id", counterController.get_description);

router.get("/image/:id", counterController.get_image);

router.get("/tags", counterController.get_tags);

//change this to something like /tags/:id
router.post("/add-tag/:id", counterController.add_tag_to_counter);

router.delete("/tags/:id", counterController.delete_tag);

router.get("/count", counterController.get_count);

router.get("/:id", counterController.get_counter);

router.post("/", upload.single("image-file"), counterController.create_counter);

router.post("/:id", counterController.update_counter);

router.patch("/:id", counterController.patch_counter);

router.delete("/:id", counterController.delete_counter);

module.exports = router;
