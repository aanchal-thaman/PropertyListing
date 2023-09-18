import Property from "../models/property.js";


export const getPropertyList = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Propertys = await Property.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999999 },
    }).limit(req.query.limit);
    res.status(200).json(Propertys);
  } catch (err) {
    next(err);
  }
};