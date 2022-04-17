import { ItemAndCount } from '../../_types/item-and-count';

export interface List {
    id: string;
    name: string;
    description: string;
    items: Array<ItemAndCount>;
}
