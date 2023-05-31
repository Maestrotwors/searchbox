import { IUser } from './user.interface';

export interface ISearchUserResponse {
  status: 'OK' | 'Error';
  data: {
    items: IUser[];
  };
}
