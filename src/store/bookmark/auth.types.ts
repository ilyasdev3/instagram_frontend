export interface IUserTypes {
  username: string;
  email: string;
  password: string;
  password2: string;
  isInProgress?: boolean;
  isErrored?: boolean;
  isSuccess?: boolean;
  message?: string;
  error?: any;
}
