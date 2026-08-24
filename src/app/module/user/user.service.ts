import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";


const uploadProfileImage = async (buffer: Buffer, userId: string) => {

    // cloudinary.uploader.upload_stream(
    //     {
    //         resource_type: "auto",
    //     },
    //     async(error, result) => {
    //         if (error) {
    //             console.error("Error uploading image to Cloudinary:", error);
    //             throw new Error("Failed to upload image");
    //         }
    //         console.log( result, "result" );

    //         const updatedUser = await prisma.user.update({
    //             where: { 
    //                 id: userId 
    //             },
    //             data: { 
    //                 imageUrl: result?.secure_url ,
    //                 image_PublicId: result?.public_id,
    //              },
    //         })

    //         console.log(updatedUser, "updatedUser");
    //         // return result;
    //     }
    // ).end(buffer);


    const currentUser = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            image_PublicId: true,
            imageUrl: true,
        }
    });


    const cloudinaryResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
            },
            async (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (!result) {
                    return reject(new Error("No result returned from Cloudinary"));
                }

                resolve(result);

            }
        ).end(buffer);
    });


    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            imageUrl: cloudinaryResult?.secure_url,
            image_PublicId: cloudinaryResult?.public_id,
        },
        omit: {
            password: true,
        },
    });

    if(currentUser?.image_PublicId && currentUser?.image_PublicId){
        await cloudinary.uploader.destroy(currentUser.image_PublicId);
    }

    console.log(updatedUser, "updatedUser");
    // return result;
  
    return updatedUser;

}

export const UserService = {
    uploadProfileImage,
};