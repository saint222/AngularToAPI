import { UserModel } from './userModel';

export interface CurrentUser {
    Data?: UserModel;
    Success: boolean;
  }
