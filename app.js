// core modules
const path = require("path");

// local modules
const farmerRoutes = require("./routes/farmer"); //importing farmer route
const wholesalerRoutes = require("./routes/wholesaler"); //importing wholesaler route
const retailerRoutes = require("./routes/retailer"); //importing retailer routes

// third-party modules
const express = require("express"); //importing express
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

// middleware pointing to public folder( To serve static files )
app.use(express.static(path.join(__dirname, "public")));

//middleware to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// set views engine
app.set("view engine", "ejs");
// set views folder
app.set("views", "views");

// middleware to use farmerRoutes
app.use("/farmer", farmerRoutes);

// middleware to use wholesalerRoutes
app.use("/wholesaler", wholesalerRoutes);

// middleware to use retailerRoutes
app.use("/retailer", retailerRoutes);

app.listen(3030, () => {
  console.log("listening on port 3030");
});
