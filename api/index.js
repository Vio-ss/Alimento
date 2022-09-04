const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser")
const cors = require("cors")

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));

const mongoUrl = 'mongodb+srv://VinishaV:VinishaV03@cluster0.dr8y72c.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err)
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//Login
app.use("/api/auth", authRoute);
//User routes
app.use("/api/users", userRoute);
// Reciepe posting, getting, deleting, updating
app.use("/api/posts", postRoute);
// Catergory
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running in the port 5000");
});


