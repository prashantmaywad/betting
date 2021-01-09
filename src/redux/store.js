import { createStore } from "redux";
import userReducer from "./reducers/User";
export default createStore(userReducer);
