import { ItemAndCount } from './item-and-count';

export interface CategoryItems {
    category: string;
    items: Array<ItemAndCount>;
    weight: number;
    weightPerc: number;
}
