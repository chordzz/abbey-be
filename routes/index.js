import { FriendController, UserController } from "../controller/index.js";
import { authentication } from "../middleware/authentication.js";
import express from "express"

const router = express.Router()


router.post("/user/register", UserController.createUser)
router.post("/user/login", UserController.login)
router.get("/user/", authentication, UserController.userDetails)
router.patch("/user/addfriend/:id", authentication, UserController.addFriend)


router.post("/friend/create", FriendController.createFriend)
router.get("/friend/all", FriendController.getAllFriends)

export default router;