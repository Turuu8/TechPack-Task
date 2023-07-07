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

export interface JobsPrps {
  data: any;
  setPage: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<never[] | any>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export interface DialogProps {
  isOpen: boolean;
  closeModal: () => void;
  hadldeDelete?: () => void;
  hadldeUpdate?: () => void;
  data?: any;
  jobId?: string;
  editValue?: string;
  setEditValue?: Dispatch<SetStateAction<string>> | any;
  edit?: string;
}

export interface MapUserProps {
  _id: string;
  role: string;
  email: string;
  firstName: string;
  phoneNumber: string;
}

export interface FromProps {
  type: string;
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (props: GeneralFrom) => void;
  from: GeneralFrom | any;
}

export interface GeneralFrom {
  userid?: string;
  lastName?: string;
  firstName?: string;
  aboutMe?: string;
  gender?: string;
  birthday?: string;
  idNumber?: string;
  phoneNumber?: string;
  location?: string;
  email?: string;
}
