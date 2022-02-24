import { SortOrder } from '../_types/sort-order';

function toLexicalOrder(value: string): string {
    return value.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 's');
}

function normalize<T>(value: T | string): T | string {
    return typeof value === 'string' ? toLexicalOrder(value) : value;
}

function compare<T>(first: T, second: T): number {
    const a = normalize(first);
    const b = normalize(second);
    return a === b ? 0 : a < b ? -1 : 1;
}

export function sortArray<T, K>(arr: Array<T>, keyMapper: (T) => K, order = SortOrder.ASCENDING): Array<T> {
    const compareFn =
        order == SortOrder.ASCENDING
            ? (first, second) => compare(keyMapper(first), keyMapper(second))
            : (first, second) => compare(keyMapper(second), keyMapper(first));
    return [...arr].sort(compareFn);
}

export function sortStringArray(arr: Array<string>, order = SortOrder.ASCENDING): Array<string> {
    const compareFn =
        order == SortOrder.ASCENDING
            ? (first, second) => compare(first, second)
            : (first, second) => compare(second, first);
    return [...arr].sort(compareFn);
}

export function groupBy<T, K>(arr: Array<T>, keyMapper: (T) => K): Map<K, Array<T>> {
    const map = new Map<K, Array<T>>();
    arr.forEach((item) => {
        const key = keyMapper(item);
        const values = map.get(key);
        if (!values) {
            map.set(key, [item]);
        } else {
            values.push(item);
        }
    });
    return map;
}
