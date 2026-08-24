import { ca } from "zod/locales";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const uploadProfileImage = catchAsync(async (req : Request, res: Response, next: NextFunction) => {

    if (!req.file) {
        throw new Error("No file uploaded");
    }

    const userId = req.user?.userId; // Assuming you have user ID in the request object

    const result = await UserService.uploadProfileImage(req.file?.buffer, userId!);

    sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Profile image uploaded successfully",
		data: result,
	});

})

export const UserController = {
    uploadProfileImage,
};