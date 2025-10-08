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

UserSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
		delete ret.password;
		return ret;
	},
}); 

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
