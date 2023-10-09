import UserRepository from "../../infrastructure/Repositories/UserRepository.js";

const userRepository = new UserRepository();

export const save = async (req, res) => {
  try {
    const user = await userRepository.save(req.body);
    if (user.type === "company") {
      res.status(201).json({ isOk: true, message: "Company created", user });
    }
    if (user.type === "admin") {
      res.status(201).json({ isOk: true, message: "Admin created", user });
    }
    if (user.type === "driver") {
      res.status(201).json({ isOk: true, message: "Driver created", user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ isOk: false, message: "Error creating user", error });
  }
};
