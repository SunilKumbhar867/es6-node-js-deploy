import express from "express";
import { register, signIn, getAllUsers } from "../controllers/user-login-controller.js";
import { isAuth, isAdmin } from "../util.js";

const route = express.Router();

route.get('/', isAuth, isAdmin, getAllUsers);
route.post('/register', register);
route.post('/signIn', isAuth, signIn);

export default route;