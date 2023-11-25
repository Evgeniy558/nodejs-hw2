import multer from "multer";
import path from "path";
const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const upload = multer({
  storage: storage,
});

export const middlewareUploadAvatar = upload.single("avatar");
