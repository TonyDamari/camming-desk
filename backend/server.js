const express = require("express");
const PORT = process.env.PORT || 6000;
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const color = require("colors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect to database
connectDB();

//Midddleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use(errorHandler);

//Serve static assest in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static(path.join(__dirname, "..", "frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "..", "frontend", "build", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => {
        res.send("Camming Desk");
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
