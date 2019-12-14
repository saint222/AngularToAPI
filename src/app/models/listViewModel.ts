import { PageInfo } from './PageInfo';

export interface ListViewModel<T> {
  Data?: T[];
  PageInfo: PageInfo;
}
