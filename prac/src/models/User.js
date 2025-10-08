const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
	},
	{ timestamps: true }
);

// Map _id to id and remove sensitive/internal fields when converting to JSON
UserSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
		// Do not leak password
		delete ret.password;
		return ret;
	},
}); 

// Avoid model overwrite issues in watch/dev environments
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
