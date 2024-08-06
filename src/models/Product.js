const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: String,
    description: String,
    price: String,
    image: String,
    user: {
      ref: "User",
      type: Schema.Types.ObjectId
    }
});

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject.passwordHash;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Product = model("Product", schema);
module.exports = Product;
