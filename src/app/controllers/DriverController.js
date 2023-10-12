import DriverRepository from "../../infrastructure/Repositories/DriverRepository.js";

const driverRepository = new DriverRepository();

export const getDriverById = async (req, res) => {
  try {
    const driver = await driverRepository.getById(req.params.id);
    if (!driver) {
      res.status(404).json({ message: "Driver not found" });
    } else {
      res.status(200).json(driver);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting driver", error });
  }
};
