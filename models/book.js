var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Authors and Genres are necessary to create Books, they are related
var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    // author: {type: String, required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    rating: {type: Number, min: 0, max: 5},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
    // genre: {type: String, required: true}
    finished: {type: Boolean, required: true, default: false}
  }
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);