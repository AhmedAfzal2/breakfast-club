import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    src: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    addOns: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
      enum: ['BREAKFAST', 'DESSERTS', 'BEVERAGES'],
    },
    subcategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;

