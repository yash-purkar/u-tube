const Filter = require("../models/filter");

// Add new filter controller
export const addFilter = async (req: any, res: any) => {
  try {
    const body = req.body;
    const newFilter = new Filter(body);
    await newFilter.save();
    return res
      .status(200)
      .send({ Success: true, message: "Filter added Successfully." });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// Get all filters endpoint
export const getAllFilters = async (req: any, res: any) => {
  try {
    const filters = await Filter.find();
    return res.status(200).send({ Success: true, filters: filters ?? [] });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};
