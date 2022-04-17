import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { uuidv4 } from '../../_utils/uuidv4';
import { List } from '../../lists/_types/list';
import { ItemAndCount } from '../../_types/item-and-count';

@Component({
    selector: 'app-add-list-dialog',
    templateUrl: './add-list-dialog.component.html',
    styleUrls: ['./add-list-dialog.component.scss'],
})
export class AddListDialogComponent {
    name = '';
    description = '';
    items: Array<ItemAndCount> = [];
    lists: Array<List> = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: Array<List> = []) {
        this.lists = data;
    }

    static open(dialog: MatDialog, data: Array<List> = []): MatDialogRef<AddListDialogComponent> {
        return dialog.open(AddListDialogComponent, { data });
    }

    submit(name: string, description: string, items: Array<ItemAndCount> = []): List {
        return {
            id: uuidv4(),
            name,
            description,
            items,
        };
    }

    useItemsOfList(change: MatSelectChange): void {
        if (change.value) this.items = change.value.items;
        else this.items = [];
    }
}
