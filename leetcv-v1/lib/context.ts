import { createContext } from "react";
import {
    User,
  } from "firebase/auth";

export interface UserContextData {
    user: User | null;
    username: string | null;
}

export const UserContext = createContext<UserContextData>({ user: null, username: null })