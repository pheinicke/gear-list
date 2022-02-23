import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Item } from '../../items/_types/item';

export interface SelectItemsDialogData {
    items: Array<Item>;
}

@Component({
    selector: 'app-select-items-dialog',
    templateUrl: './select-items-dialog.component.html',
    styleUrls: ['./select-items-dialog.component.scss'],
})
export class SelectItemsDialogComponent {
    items: Array<Item> = [];
    selectedItems: Array<Item> = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: SelectItemsDialogData) {
        this.items = data.items;
    }

    static open(dialog: MatDialog, data?: SelectItemsDialogData): MatDialogRef<SelectItemsDialogComponent> {
        return dialog.open(SelectItemsDialogComponent, {
            data: data || {},
        });
    }

    onSelectionChanged(selectedItems: Array<Item>): void {
        this.selectedItems = selectedItems;
    }
}
