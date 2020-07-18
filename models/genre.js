// This is defined as a Model as we want the "Genres" dropwdown to populate dynamically.

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
      name: {type: String, min: 3, max: 100, required: true}
    }
)

// Virtual for book's URL
// For later maybe add some other data or delete indivisual route
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genres/'
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);