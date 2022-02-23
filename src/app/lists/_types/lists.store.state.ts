import { IDLE_STATUS, StoreState } from '../../_types/store-state';

import { List } from './list';

export class ListsStoreState implements StoreState {
    lists: Array<List> = [];
    status = IDLE_STATUS;
}
