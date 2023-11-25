import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import User from "../../models/users/User.js";

export const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  const { path: tmpPath, originalname } = req.file;
  await Jimp.read(tmpPath)
    .then((avatar) => {
      return avatar.resize(250, 250).quality(60).write(tmpPath);
    })
    .catch((e) => {
      console.log(e);
    });
  const fileName = `${req.user._id}_${originalname}`;
  const uplodedFile = path.join(process.cwd(), "public", "avatars", fileName);
  await fs.rename(tmpPath, uplodedFile);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};
