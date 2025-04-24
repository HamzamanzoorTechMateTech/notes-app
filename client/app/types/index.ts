export interface I_GlobaleContext {
  user: any;
  loading: boolean;
  signupUser: (data: I_SignupUser) => Promise<boolean | undefined>;
  login: (data: I_Login) => void;
}

export interface I_Login {
  email: string;
  password: string;
}
export interface I_SignupUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
