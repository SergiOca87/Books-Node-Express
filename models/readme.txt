Models are defined using the Schema interface. The Schema allows you to define the fields stored in each document along with their validation requirements and default values.

Schemas are then "compiled" into models using the mongoose.model().

Each model maps to a collection of documents in the MongoDB database. The documents will contain the fields/schema types defined in the model Schema.