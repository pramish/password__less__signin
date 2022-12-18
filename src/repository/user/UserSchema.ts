import { Schema, model } from "mongoose";

import { IUser } from "types/user";

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    fullName: {
      type: String,
    },

    token: {
      type: String,
    },

    verificationCode: {
      type: Number,
      maxlength: 6,
      minlength: 6,
    },

    verificationExpiryTimeStamp: {
      type: Number,
    },

    verificationCodeExpiryTimeStamp: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
