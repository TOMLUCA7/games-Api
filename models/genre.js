import mongoose from "mongoose";
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    genreName: String,
    genreDesc: String
})

export default mongoose.model('Genre',genreSchema);
