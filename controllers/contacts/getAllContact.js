const { Contact } = require("../../models/contactSchema");

const getAllContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email name");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContact;
