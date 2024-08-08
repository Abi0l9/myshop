const { plugin, Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
    username: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        maxlength: 50,
        minlength: 4,
        validate: {
            validator: value => {
                const isHaveSpace = value.trim().includes(' ')
                if (value.length >= 4 && isHaveSpace) {
                    return false
                }
            },
            message:  'cannot be blank or include blank space'
        }
    },
    email: {
        type: String,
        require: [true, "email address is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: value => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: "Please enter a valid email address"
        }
    },
    passwordHash: String,
    products: [
        {
            ref: "Product",
            type: Schema.Types.ObjectId,
            default: []
        }
    ]
});

plugin(uniqueValidator);

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject.passwordHash;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const User = model("User", schema);
module.exports = User;
