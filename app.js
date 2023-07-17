// core modules
const path = require("path");

// local modules
const farmerRoutes = require("./routes/farmer"); //importing wholesaler route

// third-party modules
const express = require("express"); //importing express
const ejs = require("ejs");

const app = express();

// middleware pointing to public folder( To serve static files )
app.use(express.static(path.join(__dirname, "public")));
// set views engine
app.set("view engine", "ejs");
// set views folder
app.set("views", "views");

app.use("/farmer", farmerRoutes);

app.listen(3030);
