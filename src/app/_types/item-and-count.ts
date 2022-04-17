import { Item } from '../items/_types/item';

export interface ItemAndCount extends Item {
    count: number;
}
