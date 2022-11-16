import mongoose from "mongoose";

export async function connectdb() {
    try {
      const db = await mongoose.connect('mongodb://localhost/jwt');
      console.log(db.connection.name)
    } catch (error) {console.log(error)}
  }