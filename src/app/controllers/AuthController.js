import UserRepository from "../../infrastructure/Repositories/UserRepository.js";

const userRepository = new UserRepository();

export const login = async (req, res) => {
  try {
    const userEmail = await userRepository.findByEmail(req.body);
    if (!userEmail) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
