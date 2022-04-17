import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { List } from '../../lists/_types/list';
import { ItemAndCount } from '../../_types/item-and-count';

@Component({
    selector: 'app-edit-list-dialog',
    templateUrl: './edit-list-dialog.component.html',
    styleUrls: ['./edit-list-dialog.component.scss'],
})
export class EditListDialogComponent {
    id: string;
    name: string;
    description: string;
    items: Array<ItemAndCount>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: List) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.description = data?.description || '';
        this.items = data?.items || [];
    }

    static open(dialog: MatDialog, data?: List): MatDialogRef<EditListDialogComponent> {
        return dialog.open(EditListDialogComponent, { data: data || {} });
    }

    submit(name: string, description: string): List {
        return {
            id: this.id,
            name,
            description,
            items: this.items,
        };
    }
}
