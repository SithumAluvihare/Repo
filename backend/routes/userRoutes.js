import Express from "express";
const router = Express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
  getUsers,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router.get("/", getUsers);
router.put("/profile", updateUserProfile);
router.put("/password", updateUserPassword);
router
  .route("/:id")
  .delete(deleteUser)
  .get(getUserById);

export default router;
