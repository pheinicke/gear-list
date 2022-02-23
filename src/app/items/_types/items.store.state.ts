import { IDLE_STATUS, StoreState } from '../../_types/store-state';

import { Item } from './item';

export class ItemsStoreState implements StoreState {
    items: Array<Item> = [];
    status = IDLE_STATUS;
}
