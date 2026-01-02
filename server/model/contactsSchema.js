import mongoose, { mongo } from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!"],
    },
    message: {
        type: String
    }
}, {
    timestamps: true,
}
)

export default mongoose.model('Contact', contactSchema)