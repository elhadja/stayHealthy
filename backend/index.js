const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");
const db = require("./db");

const app = express();
const port = 3000;

db.init();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/doctors", doctorRoutes);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});