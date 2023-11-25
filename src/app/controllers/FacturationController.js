import FacturationRepository from "../../infrastructure/Repositories/FacturationRepository.js";

const facturationRepository = new FacturationRepository();

export const getFacturations = async (req, res) => {
  try {
    const facturations = await facturationRepository.getFacturation();
    return res.status(200).json(facturations);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
