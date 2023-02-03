const router = require("express").Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser
} = require("../../controllers/userController");
const { create } = require("../../models/User");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser);

module.exports = router;