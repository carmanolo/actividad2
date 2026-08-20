import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

import { createTeam, deleteTeam, getTeams, patchTeam } from "../controllers/team.controller.js";

const router = Router();

router.use(authenticateJwt);

router.get("/",getTeams);
router.post("/crear", authorizeRoles("administrador"),createTeam);
router.patch("/editar/:id_team", authorizeRoles("administrador"), patchTeam);
router.delete("/:id_team", authorizeRoles("administrador"), deleteTeam);

export default router;