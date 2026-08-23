import { Request, Response, NextFunction, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";
import { catchAsync } from "../../utils/catchAsync";
import z from "zod";
import { validateRequest } from "../../middleware/valideteRequest";

const router = Router();



router.post("/register",
	validateRequest(UserValidation.patientRegistrationZodshema),
	AuthController.registerPatient);

router.post("/verify-email",
	validateRequest(UserValidation.patientEmailVerificationZodSchema),
	AuthController.verifyPatientEmail);

router.post("/login",
	validateRequest(UserValidation.LoginZodSchema),
	AuthController.loginUser);
router.get(
	"/me",
	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
	AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
router.post("/forgot-password",
	validateRequest(UserValidation.forgetPasswordZodSchema),
	AuthController.forgetPassword);
router.post("/reset-password",
	validateRequest(UserValidation.resetPasswordZodSchema),
	AuthController.resetPassword);

export const AuthRoutes = router;