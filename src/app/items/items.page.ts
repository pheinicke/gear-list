import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EditItemDialogComponent } from '../_components/edit-item-dialog/edit-item-dialog.component';
import { ConfirmDialogComponent } from '../_components/confirm-dialog/confirm-dialog.component';

import { ItemsStore } from './_services/items.store';
import { Item } from './_types/item';

@Component({
    selector: 'app-items',
    templateUrl: './items.page.html',
    styleUrls: ['./items.page.scss'],
})
export class ItemsPage {
    constructor(public store: ItemsStore, private dialog: MatDialog) {}

    addItem(categories: Array<string>): void {
        EditItemDialogComponent.open(this.dialog, { categories })
            .afterClosed()
            .subscribe((item: Item | null) => {
                if (item) this.store.addItem(item);
            });
    }

    editItem(item: Item, categories: Array<string>): void {
        EditItemDialogComponent.open(this.dialog, { item, categories })
            .afterClosed()
            .subscribe((updatedItem: Item | null) => {
                if (updatedItem) this.store.editItem(updatedItem);
            });
    }

    deleteItem(item: Item): void {
        ConfirmDialogComponent.open(this.dialog, {
            confirm: 'Löschen',
            confirmButtonColor: 'warn',
            message: `Möchtest du "${item.name}" wirklich löschen?`,
            title: 'Löschen?',
        })
            .afterClosed()
            .subscribe((deleteItem: boolean) => {
                if (deleteItem) this.store.deleteItem(item);
            });
    }
}
