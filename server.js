const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const fs = require("fs-extra");
const uploadFolder = path.join(__dirname, "./public/upload");

const app = express();

const randomNumber = () => {
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789"; // 36
  let randomNumber = "";
  for (let i = 1; i <= 15; i++) {
    randomNumber += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return randomNumber;
};

// Middlewares
app.set("port", process.env.PORT || 2000);
app.set("public", path.join(__dirname, "public"));
app.use(
  multer({
    dest: path.join(__dirname, "./public/upload/temp"),
  }).single("image")
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(app.get("public")));

router.get("/get-images", (_req, res) => {
  var filesArray = [];
  fs.readdirSync(uploadFolder).forEach((file) => {
    if (file != "temp") {
      filesArray.push(file);
    }
  });
  res.json({
    images: filesArray,
  });
});

router.post("/images", async (req, res) => {
  try {
    const imgUrl = randomNumber();
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`public/upload/${imgUrl}${ext}`);
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
      await fs.rename(imageTempPath, targetPath);
    } else {
      await fs.unlink(imageTempPath);
    }
  } catch (error) {
    console.log("error: ", error);
  }
  res.json({});
});

app.use("/", router);

module.exports = app;
