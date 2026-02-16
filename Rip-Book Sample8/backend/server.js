const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/birthday", require("./routes/birthdayroutes"));
app.use("/api/funeral", require("./routes/funeralRoutes"));
app.use("/api/anniversary", require("./routes/anniversaryRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB Connected"))
.catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
