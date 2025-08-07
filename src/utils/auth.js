import { redirect } from "react-router";
import { axiosInstance } from "../api/axios";

// react-router loader function for checking if the route requires auth.
export async function requireAuth() {
  const CURRENT_USER_URL = "/user/own-details/";
  const SIGN_IN_PAGE_PATH = "/sign-in";
  try {
    const response = await axiosInstance.get(CURRENT_USER_URL);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log("hello");

    // throw redirect(SIGN_IN_PAGE_PATH);
  }
}
