"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .use(authenticateJwt)

router
  .get("/", /*authorizeRoles("administrador")*/ getUsers)
  .get("/detail/", /*authorizeRoles("administrador"),*/ getUser)
  .patch("/detail/", /*authorizeRoles("administrador"),*/ updateUser)
  .delete("/detail/", /*authorizeRoles("administrador"),*/ deleteUser);

export default router;