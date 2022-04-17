import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, mergeMap, Subscription, take } from 'rxjs';

import { EditListDialogComponent } from '../_components/edit-list-dialog/edit-list-dialog.component';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { ItemsStore } from '../items/_services/items.store';
import { totalWeight } from '../items/_types/item';
import { AddListDialogComponent } from '../_components/add-list-dialog/add-list-dialog.component';

import { ListsStore } from './_services/lists.store';
import { List } from './_types/list';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.page.html',
    styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnDestroy {
    columns = ['name', 'description', 'weight', 'actions'];
    subscriptions: Array<Subscription> = [];

    constructor(
        public store: ListsStore,
        private itemsStore: ItemsStore,
        private dialog: MatDialog,
        private router: Router
    ) {}

    addList(): void {
        this.subscriptions.push(
            this.store.state$
                .pipe(
                    map(({ lists }) => lists),
                    take(1),
                    mergeMap((lists) => AddListDialogComponent.open(this.dialog, lists).afterClosed())
                )
                .subscribe((list: List | null) => {
                    if (list) this.store.addList(list);
                })
        );
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

    weight(list: List): string {
        const weight = totalWeight(list.items);
        return weight.toLocaleString() + 'g';
    }

    toList(list: List): Promise<boolean> {
        return this.router.navigate(['/lists', list.id]);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
