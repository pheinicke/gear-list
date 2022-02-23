import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { EditListDialogComponent } from '../_components/edit-list-dialog/edit-list-dialog.component';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';
import { ItemsStore } from '../items/_services/items.store';

import { ListsStore } from './_services/lists.store';
import { List } from './_types/list';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.page.html',
    styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
    columns = ['name', 'description', 'weight', 'actions'];

    constructor(
        public store: ListsStore,
        private itemsStore: ItemsStore,
        private dialog: MatDialog,
        private router: Router
    ) {}

    addList(): void {
        EditListDialogComponent.open(this.dialog)
            .afterClosed()
            .subscribe((list: List | null) => {
                if (list) this.store.addList(list);
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

    totalWeight(list: List): string {
        const weight = list.items.reduce((acc, curr) => {
            const itemWeight = this.itemsStore.state.items.find((item) => item.id === curr)?.weight || '0';
            return Number.parseInt(itemWeight) + acc;
        }, 0);

        return weight.toLocaleString() + 'g';
    }

    toList(list: List): Promise<boolean> {
        return this.router.navigate(['/lists', list.id]);
    }
}
