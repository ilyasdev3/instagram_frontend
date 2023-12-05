export interface IUserTypes {
  username?: string;
  email: string;
  password: string;
  profile?: string;
  cover?: string;
  bio?: string;
  isInProgress?: boolean;
  isErrored?: boolean;
  isSuccess?: boolean;
  isValidToken?: boolean;
  message?: string;
  error?: any;
}
