// import { models,model,Document, Schema } from "mongoose";
// const { models, model, Schema } = require("mongoose");
// import { models, model, Schema } from "mongoose";
// Example: app.mjs
import { models, model, Schema } from "mongoose";



interface FilterSchemaInterface extends Document{
  name: string;
  slug: string;
}

const FilterSchema: Schema<FilterSchemaInterface> = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

// If Filter model is already there use that don't create new
const FilterModel = models.FilterModel || model('Filter',FilterSchema);
module.exports = FilterModel;