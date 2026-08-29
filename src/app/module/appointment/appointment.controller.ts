import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { AppointmentService } from "./appointment.service";


const bookAppointment = catchAsync(async (req: Request, res: Response) => {
	
    const result = await AppointmentService.bookAppointment();
	


	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Appointment booked successfully",
		data: result,
	});
});

const bookAppointmentCallback = catchAsync(async (req: Request, res: Response) => {
	
    const result =  AppointmentService.bookAppointmentCallback();
	
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Appointment callback handled successfully",
		data: result,
	});
});



export const AppointmentController = {
    bookAppointment,
    bookAppointmentCallback,
};