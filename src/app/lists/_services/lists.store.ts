import { Injectable } from '@angular/core';
import { map, Observable, of, take, tap } from 'rxjs';

import { ListsStoreState } from '../_types/lists.store.state';
import { Action } from '../../_types/action';
import { IDLE_STATE } from '../../_types/store-state';
import { StateUpdate, Store } from '../../_services/store';
import { AddItemsToList, AddList, DeleteList, EditList, LoadLists, RemoveItemFromList } from '../_types/lists-actions';
import { List } from '../_types/list';
import { uuidv4 } from '../../_utils/uuidv4';
import { Item } from '../../items/_types/item';

import { ListsService } from './lists.service';

@Injectable({ providedIn: 'root' })
export class ListsStore extends Store<ListsStoreState> {
    constructor(private listsService: ListsService) {
        super(new ListsStoreState());

        this.dispatch(new LoadLists());
    }

    addList(list: List): void {
        this.dispatch(new AddList(list));
    }

    editList(list: List): void {
        this.dispatch(new EditList(list));
    }

    deleteList(list: List): void {
        this.dispatch(new DeleteList(list));
    }

    addItemsToList(list: List, items: Array<Item>): void {
        this.dispatch(new AddItemsToList(list, items));
    }

    removeItemFromList(list: List, item: Item): void {
        this.dispatch(new RemoveItemFromList(list, item));
    }

    protected handleAction(action: Action): Observable<StateUpdate<ListsStoreState>> {
        if (action instanceof LoadLists) return this.onLoadLists();
        if (action instanceof AddList) return this.onAddList(action);
        if (action instanceof EditList) return this.onEditList(action);
        if (action instanceof DeleteList) return this.onDeleteList(action);
        if (action instanceof AddItemsToList) return this.onAddItemsToList(action);
        if (action instanceof RemoveItemFromList) return this.onRemoveItemFromList(action);

        return of(IDLE_STATE);
    }

    private onDeleteList(action: DeleteList): Observable<StateUpdate<ListsStoreState>> {
        return this.state$.pipe(
            take(1),
            map((state) =>
                state.lists.filter((list) => {
                    return list.id !== action.list.id;
                })
            ),
            tap((lists) => {
                this.listsService.updateLists(lists);
            }),
            map((lists) => ({ lists }))
        );
    }

    private onLoadLists(): Observable<StateUpdate<ListsStoreState>> {
        return this.listsService.loadLists().pipe(
            map((lists) => ({
                lists,
                ...IDLE_STATE,
            }))
        );
    }

    private onAddList(action: AddList): Observable<StateUpdate<ListsStoreState>> {
        const newList: List = { ...action.list, id: uuidv4() };
        return this.state$.pipe(
            take(1),
            map((state) => [newList, ...state.lists]),
            tap((lists) => {
                this.listsService.updateLists(lists);
            }),
            map((lists) => ({ lists }))
        );
    }

    private onEditList(action: EditList): Observable<StateUpdate<ListsStoreState>> {
        return this.state$.pipe(
            take(1),
            map((state) =>
                state.lists.map((list) => {
                    return list.id === action.list.id ? action.list : list;
                })
            ),
            tap((lists) => {
                this.listsService.updateLists(lists);
            }),
            map((lists) => ({ lists }))
        );
    }

    private onAddItemsToList(action: AddItemsToList): Observable<StateUpdate<ListsStoreState>> {
        return this.state$.pipe(
            take(1),
            tap(() => {
                const updatedList: List = {
                    ...action.list,
                    items: [...action.list.items, ...action.items.map((item) => item.id)],
                };
                this.editList(updatedList);
            })
        );
    }

    private onRemoveItemFromList(action: RemoveItemFromList): Observable<StateUpdate<ListsStoreState>> {
        return this.state$.pipe(
            take(1),
            tap(() => {
                const updatedItems = action.list.items.filter((itemId) => itemId !== action.item.id);
                const updatedList = { ...action.list, items: updatedItems };
                this.editList(updatedList);
            })
        );
    }
}
