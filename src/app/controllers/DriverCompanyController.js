import DriverCompanyRepository from "../../infrastructure/Repositories/DriverCompanyRepository.js";

const driverCompanyRepository = new DriverCompanyRepository();

export const getRequest = async (req, res) => {
  try {
    const request = await driverCompanyRepository.getRequest();
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRequestByCompanyId = async (req, res) => {
  try {
    const request = await driverCompanyRepository.getRequestByCompanyId(
      req.params
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRequestByDriverId = async (req, res) => {
  try {
    const request = await driverCompanyRepository.getRequestByDriverId(
      req.params
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const request = await driverCompanyRepository.createRequest(req.body);
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const putRequest = async (req, res) => {
  try {
    const request = await driverCompanyRepository.putRequest(req.body);
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await driverCompanyRepository.deleteRequest(req.body);
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
