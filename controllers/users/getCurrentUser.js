import { getUserbyId } from "../../models/users/users.js";

export const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await getUserbyId(userId);
    if (!user) {
      return res.status(404).json("Error! User not found!");
    }
    const { email, subscription } = user;
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { email, subscription },
    });
  } catch (err) {
    res.status(500).json("An error occurred while getting the contact: ${err}");
  }
};
