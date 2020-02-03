import app from "./app";
import config from "./config/config";
import mongoose from "mongoose";

// connect to mongo db
mongoose.connect(
  config.DB,
  {
    bufferMaxEntries: 0,
    socketTimeoutMS: 0,
    keepAlive: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  },
  () => {
    if (config.env === "test") {
      mongoose.connection.db.dropDatabase();
    }
  }
);

const db = mongoose.connection;
db.on("error", () => {
  console.log("FAILED to connect to mongoose");
});
db.once("open", () => {
  console.log("Connected to MongoDb");
});

app.listen(config.PORT, () => {
  console.log("Express Server is Running @ Port -> 3000!!!");
});
