import { jwtDecode } from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import JwtUserPayload from "../../types/JwtUserPayload";
import { getToken } from "../../services/TokenService";

const initState = (): JwtUserPayload | null => {
  try {
    return jwtDecode<JwtUserPayload>(getToken() + "");
  } catch (error) {
    return null;
  }
};

const UserPayloadReducer = createSlice({
  initialState: initState(),
  name: "UserPayload",
  reducers: {
    setUserPayload: (_, action) => {
      return jwtDecode(action.payload);
    },
    setUserNull: (state, _) => {
      return state;
    }
  },
});

export const userPayloadSelector = (state: { userPayload: JwtUserPayload | null }) => state.userPayload;

export default UserPayloadReducer;
