import { distinctUntilChanged, MonoTypeOperatorFunction, OperatorFunction, pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { SortOrder } from '../_types/sort-order';

import { sortArray } from './arrays';

// noinspection JSUnusedGlobalSymbols
export function debugLog<T>(tag: string): OperatorFunction<T, T> {
    return tap(
        (value: T) => console.log(`${tag}>>> NEXT`, value),
        // eslint-disable-next-line
        (error: any) => console.log(`${tag}>>> ERROR`, error),
        () => console.log(`${tag}>>> COMPLETE`)
    );
}

export function mapNotNull<T, R>(mapper: (value: T, index: number) => R, thisArg?: unknown): OperatorFunction<T, R> {
    return pipe(
        map(mapper, thisArg),
        filter((value: R) => value !== null && value !== undefined)
    );
}

function joinByKey<T>(array: Array<T>, key: keyof T, separator = ' '): string {
    return array.map((v) => v[key]).join(separator);
}

export function distinctUntilArrayChanged<T>(itemKey: keyof T): MonoTypeOperatorFunction<Array<T>> {
    return distinctUntilChanged((a1: Array<T>, a2: Array<T>) => joinByKey(a1, itemKey) === joinByKey(a2, itemKey));
}

export function distinctUntilStringArrayChanged<T extends string>(): MonoTypeOperatorFunction<Array<T>> {
    return distinctUntilChanged((a1: Array<T>, a2: Array<T>) => a1.join('-') === a2.join('-'));
}

export function sortBy<T, K>(keyMapper: (T) => K, order = SortOrder.ASCENDING): OperatorFunction<Array<T>, Array<T>> {
    return map((arr) => sortArray(arr, keyMapper, order));
}
