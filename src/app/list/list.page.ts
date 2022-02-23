import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, withLatestFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { param } from '../_utils/activated-routes';
import { ListsStore } from '../lists/_services/lists.store';
import { List } from '../lists/_types/list';
import { mapNotNull } from '../_utils/operators';
import { Item } from '../items/_types/item';
import { ItemsStore } from '../items/_services/items.store';
import { SelectItemsDialogComponent } from '../_components/select-items-dialog/select-items-dialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage {
    listId$: Observable<string>;
    list$: Observable<List>;
    listItems$: Observable<Array<Item>>;
    itemSuggestions$: Observable<Array<Item>>;
    columns = ['name', 'description', 'weight', 'actions'];

    constructor(
        public store: ListsStore,
        private itemsStore: ItemsStore,
        private dialog: MatDialog,
        route: ActivatedRoute
    ) {
        this.listId$ = param(route, 'id');
        this.list$ = this.listId$.pipe(
            mergeMap((id) => {
                return store.state$.pipe(mapNotNull((state) => state.lists.find((list) => list.id === id)));
            })
        );
        this.listItems$ = this.list$.pipe(
            mergeMap((list) => {
                return this.itemsStore.items$.pipe(
                    map((items) => items.filter((item) => list.items.includes(item.id)))
                );
            })
        );
        this.itemSuggestions$ = this.list$.pipe(
            withLatestFrom(this.itemsStore.items$),
            map(([list, allItems]) => {
                return allItems.filter((item) => !list.items.includes(item.id));
            })
        );
    }

    removeItemFromList(list: List, itemToRemove: Item): void {
        this.store.removeItemFromList(list, itemToRemove);
    }

    showAddItemDialog(list: List, items: Array<Item>): void {
        SelectItemsDialogComponent.open(this.dialog, { items })
            .afterClosed()
            .subscribe((selectedItems: Array<Item> | null) => {
                if (!items?.length) return;
                this.store.addItemsToList(list, selectedItems);
            });
    }
}
