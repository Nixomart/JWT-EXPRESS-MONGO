import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//metodos

/* userSchema.method('encryptPassword', function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
});

userSchema.method('validPassword', function(password) {
  return bcrypt.compareSync(password, this.password);
});
 */

userSchema.statics.encryptPassword = async(password) =>{
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async(password, recivedPassword) =>{
  return await bcrypt.compare(password, recivedPassword)
}

export default model('User', userSchema)