import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: false,
    },
    otp_used: {
        type: Boolean,
        required: true,
    },
    assets: [{
        id: String,
        type: String,
        ref: String
    }]
}, {
    id: false,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true, setters: false },
    timestamps: true,
});

export default mongoose.model('user', user);
