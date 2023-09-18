import Property from "../models/property.js";

export const createProperty = async (req, res, next) => {
  const newProperty = new Property(req.body);

  try {
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) {
    next(err);
  }
};
export const updateProperty = async (req, res, next) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (err) {
    next(err);
  }
};
export const deleteProperty = async (req, res, next) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getProperty = async (req, res, next) => {
  try {
    const Property = await Property.findById(req.params.id);
    res.status(200).json(Property);
  } catch (err) {
    next(err);
  }
};
export const getPropertys = async (req, res, next) => {
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
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Property.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const PropertyCount = await Property.countDocuments({ type: "Property" });
    const apartmentCount = await Property.countDocuments({ type: "apartment" });
    const resortCount = await Property.countDocuments({ type: "resort" });
    const villaCount = await Property.countDocuments({ type: "villa" });
    const guesthouseCount = await Property.countDocuments({ type: "guesthouse" });

    res.status(200).json([
      { type: "Property", count: PropertyCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "guesthouse", count: guesthouseCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getPropertyRooms = async (req, res, next) => {
  try {
    const Property = await Property.findById(req.params.id);
    const list = await Promise.all(
      Property.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};