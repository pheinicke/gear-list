import { Injectable } from '@angular/core';
import { map, Observable, of, take, tap } from 'rxjs';

import { ItemsStoreState } from '../_types/items.store.state';
import { Action } from '../../_types/action';
import { IDLE_STATE } from '../../_types/store-state';
import { StateUpdate, Store } from '../../_services/store';
import { AddItem, DeleteItem, EditItem, LoadItems } from '../_types/item-actions';
import { Item } from '../_types/item';
import { uuidv4 } from '../../_utils/uuidv4';
import { distinctUntilStringArrayChanged, sortBy } from '../../_utils/operators';
import { sortStringArray } from '../../_utils/arrays';

import { ItemsService } from './items.service';

@Injectable({ providedIn: 'root' })
export class ItemsStore extends Store<ItemsStoreState> {
    items$: Observable<Array<Item>>;
    categories$: Observable<Array<string>>;

    constructor(private itemsService: ItemsService) {
        super(new ItemsStoreState());

        this.items$ = this.state$.pipe(
            map((state) => state.items),
            sortBy((item) => item.name)
        );

        this.categories$ = this.items$.pipe(
            map((items) => items.map((item) => item.category?.trim() || '').filter((category) => !!category)),
            map((categories) => sortStringArray([...new Set(categories)])),
            distinctUntilStringArrayChanged()
        );

        this.dispatch(new LoadItems());
    }

    addItem(item: Item): void {
        this.dispatch(new AddItem(item));
    }

    editItem(item: Item): void {
        this.dispatch(new EditItem(item));
    }

    deleteItem(item: Item): void {
        this.dispatch(new DeleteItem(item));
    }

    protected handleAction(action: Action): Observable<StateUpdate<ItemsStoreState>> {
        if (action instanceof LoadItems) return this.onLoadItems();
        if (action instanceof AddItem) return this.onAddItem(action);
        if (action instanceof EditItem) return this.onEditItem(action);
        if (action instanceof DeleteItem) return this.onDeleteItem(action);
        return of(IDLE_STATE);
    }

    private onDeleteItem(action: DeleteItem): Observable<StateUpdate<ItemsStoreState>> {
        return this.state$.pipe(
            take(1),
            map((state) =>
                state.items.filter((item) => {
                    return item.id !== action.item.id;
                })
            ),
            tap((items) => {
                this.itemsService.updateItems(items);
            }),
            map((items) => ({ items }))
        );
    }

    private onLoadItems(): Observable<StateUpdate<ItemsStoreState>> {
        return this.itemsService.loadItems().pipe(
            map((items) => ({
                items,
                ...IDLE_STATE,
            }))
        );
    }

    private onAddItem(action: AddItem): Observable<StateUpdate<ItemsStoreState>> {
        const newItem: Item = { ...action.item, id: uuidv4() };
        return this.state$.pipe(
            take(1),
            map((state) => [newItem, ...state.items]),
            tap((items) => {
                this.itemsService.updateItems(items);
            }),
            map((items) => ({ items }))
        );
    }

    private onEditItem(action: EditItem): Observable<StateUpdate<ItemsStoreState>> {
        return this.state$.pipe(
            take(1),
            map((state) =>
                state.items.map((item) => {
                    return item.id === action.item.id ? action.item : item;
                })
            ),
            tap((items) => {
                this.itemsService.updateItems(items);
            }),
            map((items) => ({ items }))
        );
    }
}
