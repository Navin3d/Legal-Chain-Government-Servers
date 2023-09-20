import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    asset_ids   : [String]
}, {
    id: false,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true, setters: false },
    timestamps: true,
});

export default mongoose.model('user', user);
