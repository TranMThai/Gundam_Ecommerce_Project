import { configureStore } from "@reduxjs/toolkit";
import UserPayloadReducer from "./reducer/UserPayloadReducer";

const store = configureStore({
  reducer: {
    userPayload: UserPayloadReducer.reducer,
  },
});

export default store;
