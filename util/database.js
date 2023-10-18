// third-party modules
const mongoose = require("mongoose"); //importing mongoose

const dbConnect = mongoose
  .connect(
    "mongodb+srv://emma:Kingaggor4ever.@cluster0.etcmdtk.mongodb.net/TomatrackDB"
  )
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// export mongooseConnect
exports.mongooseConnect = dbConnect;
