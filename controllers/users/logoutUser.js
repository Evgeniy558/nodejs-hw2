import { getUserbyId } from "../../models/users/users.js";

export const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await getUserbyId(_id);

    if (!user) {
      return res.status(404).json("Error! User not found!");
    }
    user.token = null;

    await user.save();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred during logout.",
    });
  }
};
