import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";

const router = Router();

import {
  handleDoesUserExistInDB,
  handleGetUserInfo,
  handleRegisterNewUser,
} from "./user-r-middlewares";

router.post("/register", jwtCheck, handleRegisterNewUser);
router.get("/existsInDB", jwtCheck, handleDoesUserExistInDB);
router.get("/userInfo", handleGetUserInfo);
// router.get("/", getAllUsersInDB);

export default router;
