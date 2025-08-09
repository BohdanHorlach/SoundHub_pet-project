const Router = require('express').Router;
const router = new Router();
const upload = require("../middlewares/upload-middleware");
const musicController = require("../controllers/music-card-controller");
const categoryController = require("../controllers/category-controller");
const { authMiddleware, roleMiddleware } = require('../middlewares/auth-middleware');
const Roles = require('../enums/roles');
const usersController = require('../controllers/users-controller');


router.get("/category", categoryController.getAll);
router.get("/user", authMiddleware, usersController.getCurrentUser);

router.get("/music", musicController.getAll);
router.post("/music", authMiddleware, upload.single("audio"), musicController.uploadCard);
router.post("/music/:id", authMiddleware, roleMiddleware(Roles.ADMIN), musicController.getAll);

module.exports = router;