const Router = require('express').Router;
const router = new Router();
const upload = require("../middlewares/upload-middleware");
const musicController = require("../controllers/music-card-controller");
const categoryController = require("../controllers/category-controller");
const { authMiddleware, roleMiddleware } = require('../middlewares/auth-middleware');
const Roles = require('../enums/roles');
const usersController = require('../controllers/users-controller');
const favoriteController = require('../controllers/favorite-controller');
const checkUploadLimit = require('../middlewares/check-upload-limit');


router.get("/category", categoryController.getAll);
router.get("/user", authMiddleware(), usersController.getCurrentUser);
router.get("/user/:id", usersController.getUserData);

router.get("/music", authMiddleware(true), musicController.getCards);
router.post("/music", authMiddleware(), checkUploadLimit, upload.single("audio"), musicController.uploadCard);
router.post("/music/:id", authMiddleware(), roleMiddleware(Roles.ADMIN), musicController.update);
router.get("/music/:id/download", musicController.download);

router.post("/favorite/:id", authMiddleware(), favoriteController.toggleFavorite);

module.exports = router;