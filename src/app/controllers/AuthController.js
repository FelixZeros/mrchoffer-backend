import UserRepository from "../../infrastructure/Repositories/UserRepository.js";

const userRepository = new UserRepository();

export const login = async (req, res) => {
  try {
    const user = await userRepository.login(req.body);

    res.status(200).json({ message: "User logged in", user });
  } catch (Error) {
    res.status(400).json({ message: Error.message });
  }
};
