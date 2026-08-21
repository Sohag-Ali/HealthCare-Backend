import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExists = await prisma.user.findFirst({
            where: {
                role: Role.SUPER_ADMIN
            }
        });

        if(isSuperAdminExists) {
            console.log("Super admin already exists");
            return;
        }
        const name = config.super_admin_name!;
        const email = config.super_admin_email!;
        const password = config.super_admin_password!;

        if(!name || !email || !password) {
            throw new Error("Super admin credentials are not set in the environment variables");
        }

        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

        const superAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.SUPER_ADMIN,
                needPasswordChange: false,
                emailVerified: true,
            }
        });

        console.log("Super admin seeded successfully:", superAdmin);


    } catch (error) {
        console.error("Error seeding super admin:", error);

        await prisma.user.delete({
            where: {
                email: config.super_admin_email!
            }
        })
    }
}

export const seedTesterAdmin = async () => {
    try {
        const isTesterAdminExists = await prisma.user.findFirst({
            where: {
                role: Role.ADMIN,
                email: config.tester_admin_email!
            }
        });
        if(isTesterAdminExists) {
            console.log("Tester admin already exists");
            return;
        }
        const name = config.tester_admin_name!;
        const email = config.tester_admin_email!;
        const password = config.tester_admin_password!;

        if(!name || !email || !password) {
            throw new Error("Tester admin credentials are not set in the environment variables");
        }
        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

        const testerAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.ADMIN,
                needPasswordChange: false,
                emailVerified: true,
            }
        });
        console.log("Tester admin seeded successfully:", testerAdmin);
    } catch (error) {
        console.error("Error seeding tester admin:", error);
        await prisma.user.delete({
            where: {
                email: config.tester_admin_email!
            }
        })
    }
}

export const seedTesterDoctor = async () => {
    try {
        const isTesterDoctorExists = await prisma.user.findFirst({
            where: {
                role: Role.DOCTOR,
                email: config.tester_doctor_email!
            }
        });
        if(isTesterDoctorExists) {
            console.log("Tester doctor already exists");
            return;
        }
        const name = config.tester_doctor_name!;
        const email = config.tester_doctor_email!;
        const password = config.tester_doctor_password!;

        if(!name || !email || !password) {
            throw new Error("Tester doctor credentials are not set in the environment variables");
        }
        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

        const testerDoctor = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.DOCTOR,
                needPasswordChange: false,
                emailVerified: true,
            }
        });
        console.log("Tester doctor seeded successfully:", testerDoctor);
    } catch (error) {
        console.error("Error seeding tester doctor:", error);
        await prisma.user.delete({
            where: {
                email: config.tester_doctor_email!
            }
        })
    }
}
