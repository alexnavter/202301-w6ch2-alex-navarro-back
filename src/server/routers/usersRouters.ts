import { Router } from "express";
import multer from "multer";
import loginUser, { createUser } from "../controllers/usersControllers.js";

const usersRouter = Router();

const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    callback(null, file.filename + "jpeg");
  },
});

usersRouter.post("/login", loginUser);

usersRouter.post("/register", upload.single("avatar"), createUser);

export default usersRouter;
