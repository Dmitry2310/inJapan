import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import users from "./users";

export default combineReducers({ posts, auth, users });