import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";

const router = Router();

import {
  handleDoesUserExistInDBRequest,
  handleGetUserInfo,
  handleRegisterNewUser,
} from "./user-r-middlewares";

router.post("/register", jwtCheck, handleRegisterNewUser);
router.get("/existsInDB", jwtCheck, handleDoesUserExistInDBRequest);
router.get("/userInfo", jwtCheck, handleGetUserInfo);
// router.get("/", getAllUsersInDB);

export default router;
