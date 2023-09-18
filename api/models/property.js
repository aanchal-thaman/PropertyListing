import mongoose from "mongoose";
const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  room: {
    type: Number,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },

});

export default mongoose.model("Property", PropertySchema)
