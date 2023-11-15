// core modules
const path = require("path");

// local modules
const farmerRoutes = require("./routes/farmer"); //importing farmer route
const wholesalerRoutes = require("./routes/wholesaler"); //importing wholesaler route
const distributorRoutes = require("./routes/distributor"); //importing distributor routes
const retailerRoutes = require("./routes/retailer"); //importing retailer routes
const staticPagesRoutes = require("./routes/staticpages"); //importing staticPages routes
const registerAndLoginRoutes = require("./routes/registerAndLogin"); //importing register&loging routes
const productRoutes = require("./routes/product"); //importing product routes
const User = require("./models/user"); //importing User model

// third-party modules
const express = require("express"); //importing express
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //importing mongoose
const dbConnect = require("./util/database"); //importing dbConnect
require("dotenv").config(); //importing dotenv

const app = express();

// set views engine
app.set("view engine", "ejs");
// set views folder
app.set("views", "views");

// register middleware to store user as a request
// app.use((req, res, next) => {
//   User.findUser(1)
//     .then((user) => {
//       req.user = user;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// connect to mongoose
// dbConnect();

// middleware pointing to public folder( To serve static files )
app.use(express.static(path.join(__dirname, "public")));

//middleware to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// middleware to use staticPagesRoutes
app.use(staticPagesRoutes);

// middleware to use registerAndLoginRoutes
app.use(registerAndLoginRoutes);

// middleware to use farmerRoutes
app.use("/farmer", farmerRoutes);

// middleware to use wholesalerRoutes
app.use("/wholesaler", wholesalerRoutes);

// middleware to use distributorRoutes
app.use("/distributor", distributorRoutes);

// middleware to use retailerRoutes
app.use("/retailer", retailerRoutes);

// middleware to use productRoutes
app.use(productRoutes);

const port = process.env.PORT;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
