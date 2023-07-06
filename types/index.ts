import { Dispatch, SetStateAction } from "react";

export interface SubmitProps {
  email: string;
  password: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthType {
  checking?: boolean;
  token?: string | null;
  userInfo?: UserInfo;
  logout: () => void;
  setChecking: Dispatch<SetStateAction<boolean>>;
  setLoader: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserInfo: Dispatch<SetStateAction<UserInfo[] | any>>;
}

export interface UserInfo {
  iat: number;
  email: string;
  id: string;
  phoneNumber: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export interface DialogProps {
  isOpen: boolean;
  closeModal: () => void;
}
