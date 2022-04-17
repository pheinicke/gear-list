import { ItemAndCount } from '../../_types/item-and-count';

export interface Item {
    id: string;
    name: string;
    description: string;
    category: string;
    weight: string;
}

export function totalWeight(items: Array<ItemAndCount>): number {
    return items.reduce((acc, curr) => {
        return Number.parseInt(curr.weight) * curr.count + acc;
    }, 0);
}
