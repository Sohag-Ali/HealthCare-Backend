import { Request, Response, NextFunction, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { catchAsync } from "../../utils/catchAsync";
import z from "zod";
import { validateRequest } from "../../middleware/valideteRequest";
import { UserController } from "./user.controller";
import { upload } from "../../lib/multer";

const router = Router();


router.patch("/profile-image",
    auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
    upload.single("profileImage"), 
    UserController.uploadProfileImage);

export const UserRoutes = router;