import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.PUBLIC_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

export const uploadFile = async (file) => {
  try {
    const uniqueToken = uuidv4();
    const fileName = `${uniqueToken}_${file.name}`;
    const stream = fs.createReadStream(file.tempFilePath);

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: stream,
    };
    const command = new PutObjectCommand(uploadParams);
    await client.send(command);
    const objectUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${fileName}`;
    fs.unlinkSync(file.tempFilePath);
    return { objectUrl, fileName: fileName };
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileName) => {
  try {
    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(deleteParams);
    await client.send(command);

    return "Objeto eliminado con éxito";
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el objeto del bucket");
  }
};
