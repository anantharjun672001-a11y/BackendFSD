import Service from "../models/serviceModels.js";

// CREATE
export const createService = async (req, res) => {
  const { name, price } = req.body;

  const service = await Service.create({ name, price });

  res.json(service);
};

// GET ALL
export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// DELETE
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};