require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://blizz:${process.env.MONGO_P}@urlshorter.lry8sam.mongodb.net/?retryWrites=true&w=majority`);
console.log(`mongodb+srv://blizz:${process.env.MONGO_P}@urlshorter.lry8sam.mongodb.net/?retryWrites=true&w=majority`);

let urlSchema = mongoose.Schema({
    original_url: String,
    short_id: Number
})

let UrlModel = mongoose.model('UrlModel', urlSchema);

module.exports = {
    UrlModel: UrlModel,
    UrlSchema: urlSchema
};