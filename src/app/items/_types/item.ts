export interface Item {
    id: string;
    name: string;
    description: string;
    category: string;
    weight: string;
}

export function totalWeight(items: Array<Item>): number {
    return items.reduce((acc, curr) => {
        return Number.parseInt(curr.weight) + acc;
    }, 0);
}
