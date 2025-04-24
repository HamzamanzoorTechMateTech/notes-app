import axios from "../config/axios";
import { createContext, useState, type FC, type ReactNode } from "react";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import { APIPaths } from "~/config/APIPaths";
import type { I_GlobaleContext, I_Login, I_SignupUser } from "~/types";
const initialValue: I_GlobaleContext = {
  user: null,
  loading: false,
  signupUser: async (data: I_SignupUser) => undefined,
  login: (data: I_Login) => {},
};
export const GlobaleContext = createContext(initialValue);
export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(
    null
    // JSON.parse(localStorage.getItem("user") || "null")
  );
  const [loading, setLoading] = useState(false);
  const signupUser = async (data: I_SignupUser) => {
    try {
      setLoading(true);
      const response = await axios.post(APIPaths.USER_SIGNUP, data);
      if (response.status === 200) {
        toast.success("user Signup successfull");
        return true;
      }
    } catch (error) {
      console.log(`Error in signup: ${error}`);
      toast.error("There is an error in signup");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const login = async (data: I_Login) => {
    try {
      setLoading(true);
      const response = await axios.post(APIPaths.AUTH, data);
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("user login successfull");
        redirect("/dashboard");
      }
    } catch (error) {
      console.log(`Error in Login: ${error}`);
      toast.error("There is an error in Login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <GlobaleContext.Provider value={{ user, loading, signupUser, login }}>
      {children}
    </GlobaleContext.Provider>
  );
};
