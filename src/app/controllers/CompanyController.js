import CompanyRepository from "../../infrastructure/Repositories/CompanyRepository.js";

const companyRepository = new CompanyRepository();

export const getCompanys = async (req, res) => {
  try {
    const companys = await companyRepository.getCompany();
    return res.status(200).json(companys);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCompanyByUsername = async (req, res) => {
  try {
    const company = await companyRepository.getCompanyByUsername(
      req.params.username
    );
    return res.status(200).json(company);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
