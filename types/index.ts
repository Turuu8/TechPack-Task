import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

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

export interface AddJobsProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
