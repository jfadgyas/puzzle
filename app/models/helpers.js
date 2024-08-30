import mongoose from "mongoose"

const helperSchema = new mongoose.Schema({
    brands: [String],
    tags: [String]
})
  
export default mongoose.models.Helpers || mongoose.model('Helpers', helperSchema)