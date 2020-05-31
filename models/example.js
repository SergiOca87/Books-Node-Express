//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

// Compile model from schema
// The first argument is the singular name of the collection that will be created for your model
// the second argument is the schema you want to use in creating the model.
module.exports = mongoose.model('SomeModel', SomeModelSchema );

// Schema field types example
// Define fields in 2 different ways:
// Field name and type as a key-value pair (i.e. as done with fields name, binary and living).
// Field name followed by an object defining the type (updated, etc.)

// The eggs field shows some built in validator error messages
var schema = new Schema(
    {
      name: String,
      binary: Buffer,
      living: Boolean,
      updated: { type: Date, default: Date.now() },
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Why no eggs?']
      },
      mixed: Schema.Types.Mixed,
      _someId: Schema.Types.ObjectId,
      array: [],
      ofString: [String], // You can also have an array of each of the other types too.
      nested: { stuff: { type: String, lowercase: true, trim: true } }
    }
)


