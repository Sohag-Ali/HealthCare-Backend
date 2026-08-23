import z from "zod";
const patientRegistrationZodshema = z.object({
	name: z.string("Not a String").min(2, "Name must be at least 2 characters long").max(30, "Name must be at most 30 characters long"),
	email: z.email("Invalid email address"),
	password: z.string("Not a String")
	.min(6, "Password must be at least 6 characters long")
	.max(30, "Password must be at most 30 characters long")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
	patient: z.object({
		contactNumber: z.string().optional(),
	}).optional()
});

const LoginZodSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string("Not a String")
	.min(6, "Password must be at least 6 characters long")
	.max(30, "Password must be at most 30 characters long")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

const forgetPasswordZodSchema = z.object({
	email: z.email("Invalid email address"),
});

const resetPasswordZodSchema = z.object({
	email: z.email("Invalid email address"),
	newPassword: z.string("Not a String")
	.min(6, "Password must be at least 6 characters long")
	.max(30, "Password must be at most 30 characters long")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
	otp: z.string().length(6),
});

export const UserValidation = {
    patientRegistrationZodshema,
	LoginZodSchema,
	forgetPasswordZodSchema,
	resetPasswordZodSchema
};