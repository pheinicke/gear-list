import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, withLatestFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { param } from '../_utils/activated-routes';
import { ListsStore } from '../lists/_services/lists.store';
import { List } from '../lists/_types/list';
import { Item, totalWeight } from '../items/_types/item';
import { ItemsStore } from '../items/_services/items.store';
import { SelectItemsDialogComponent } from '../_components/select-items-dialog/select-items-dialog.component';
import { sortStringArray } from '../_utils/arrays';
import { EditListDialogComponent } from '../_components/edit-list-dialog/edit-list-dialog.component';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage {
    listId$: Observable<string>;
    list$: Observable<List>;
    listItems$: Observable<Array<{ category: string; items: Array<Item>; weight: number; weightPerc: number }>>;
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
                return store.list(id);
            })
        );
        this.listItems$ = this.list$.pipe(
            mergeMap((list) => {
                return this.itemsStore.items$.pipe(
                    map((items) => items.filter((item) => list.items.includes(item.id))),
                    map((items) => this.groupByCategory(list, items))
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

    editList(list: List): void {
        EditListDialogComponent.open(this.dialog, list)
            .afterClosed()
            .subscribe((updatedList: List | null) => {
                if (updatedList) this.store.editList(updatedList);
            });
    }

    deleteList(event: Event, list: List): void {
        event.stopImmediatePropagation();
        ConfirmDialogComponent.open(this.dialog, {
            confirm: 'Löschen',
            confirmButtonColor: 'warn',
            message: `Möchtest du "${list.name}" wirklich löschen?`,
            title: 'Löschen?',
        })
            .afterClosed()
            .subscribe((deleteList: boolean) => {
                if (deleteList) this.store.deleteList(list);
            });
    }

    weight(list: List): number {
        const listItems = this.listItems(list);
        return totalWeight(listItems);
    }

    private listItems(list: List): Array<Item> {
        return this.itemsStore.state.items.filter((item) => list.items.includes(item.id));
    }

    private groupByCategory(
        list: List,
        items: Array<Item>
    ): Array<{ category: string; items: Array<Item>; weight: number; weightPerc: number }> {
        const result = [];
        const categories = sortStringArray(ItemsStore.categories(items));
        const listWeight = this.weight(list);
        categories.forEach((category) => {
            const categoryItems = items.filter((item) => item.category === category);
            const weight = totalWeight(categoryItems);
            const weightPerc = Math.round((weight * 100) / listWeight);
            result.push({ category, items: categoryItems, weight, weightPerc });
        });
        const itemsWithoutCategory = items.filter((item) => !item.category);
        const weight = totalWeight(itemsWithoutCategory);
        const weightPerc = Math.round((weight * 100) / listWeight);
        result.push({
            category: '',
            items: itemsWithoutCategory,
            weight,
            weightPerc,
        });

        return result;
    }
}
