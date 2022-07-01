import { editFileName, imageFileFilter } from '@/lib/filter-uploads';
import multer from 'multer';

export const uploadMiddleware = (path: string) => {
    const upload = multer({
        limits: { fileSize: 1000 * 1024 },
        storage: multer.diskStorage({
            destination: './public/uploads/' + path,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    });
    return upload.single('image');
}