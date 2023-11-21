import User from "./User.js";

export const getUserbyId = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    console.log(err);
  }
};
