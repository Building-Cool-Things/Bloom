import mongoose from "mongoose";

async function connect() {
    console.log('process.env.DB_URI',process.env.DB_URI)
    if(!process.env.DB_URI){
        return new Error('DB URI NOT FOUND')
    }
  const dbUri = process.env.DB_URI;

  try {
    await mongoose.connect(dbUri);
    console.info("DB connected");
  } catch (error) {
    console.log(error)
    // logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;