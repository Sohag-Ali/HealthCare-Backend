import { Request, Response, NextFunction, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { catchAsync } from "../../utils/catchAsync";
import z from "zod";
import { validateRequest } from "../../middleware/valideteRequest";
import { AppointmentController } from "./appointment.controller";

const router = Router();



router.post("/book-appointment",
    AppointmentController.bookAppointment);

    router.get("/book-appointment/payment/callback", AppointmentController.bookAppointmentCallback);


export const AppointmentRoutes = router;