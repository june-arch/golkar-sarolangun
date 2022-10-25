// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage({
    projectId: 'golkar-sarolangun',
    keyFilename: 'golkar-sarolangun-90c13b6c24b2.json',
});

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: 'key.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

export async function uploadFile(path: string, file: Express.Multer.File): Promise<string> {
    path = path.replace(/\s+/g, "-").toLowerCase();
    const myBucket = storage.bucket('bucket-golkar-sarolangun');
    try {
        console.log('upload fiel : ', file);
        const optionUpload = {
            destination: `${path}/${file.filename}`,
            generationMatchPrecondition: 0,
        }
        await myBucket.upload(file.path, optionUpload);
        return path;
    } catch (errO) {
        return Promise.reject(errO);
    }
}

export async function deleteFile(path: string, filename: string): Promise<string> {
    path = path.replace(/\s+/g, "-").toLowerCase();
    const myBucket = storage.bucket(`bucket-golkar-sarolangun`);
    try {
        myBucket.file(`${path}/${filename}`).delete();
        return path;
    } catch (errO) {
        return Promise.reject(errO);
    }
}