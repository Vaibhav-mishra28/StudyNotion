// const express = require("express");
// const app = express();

// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const {cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// dotenv.config();
// const PORT = process.env.PORT || 4000;

// //database connect
// database.connect();
// //middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
// 	cors({
// 		origin:"http://localhost:3000",
// 		credentials:true,
// 	})
// )

// app.use(
// 	fileUpload({
// 		useTempFiles:true,
// 		tempFileDir:"/tmp",
// 	})
// )
// //cloudinary connection
// cloudinaryConnect();

// //routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// //def route

// app.get("/", (req, res) => {
// 	return res.json({
// 		success:true,
// 		message:'Your server is up and running....'
// 	});
// });

// app.listen(PORT, () => {
// 	console.log(`App is running at ${PORT}`)
// })



const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// PORT
const PORT = process.env.PORT || 4000;

// Connect to database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS — allow frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://study-notion-two-mu.vercel.app", // <-- update with your real Vercel frontend URL
    ],
    credentials: true,
  })
);

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary
cloudinaryConnect();

// Backend routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Serve frontend if built inside /client (optional for full-stack deployment)
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Default route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Your server is up and running..." });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
