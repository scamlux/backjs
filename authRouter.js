const Router = require("express");
const controller = require("./authController");
const router = new Router();
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "username must be not empty").notEmpty(),
    check("password", "password must be not less then 8 characters").isLength({
      min: 8,
      max: 20,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
// dostup berilgan rollar ['ADMIN',USER] va shunga oxshash
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;
