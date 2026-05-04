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



// UPDATE SERVICE
export const updateService = async (req, res) => {
  try {
    const { name, price } = req.body;

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true } // updated value return
    );

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};