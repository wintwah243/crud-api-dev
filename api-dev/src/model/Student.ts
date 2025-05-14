import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Student = mongoose.model('Student', StudentSchema);