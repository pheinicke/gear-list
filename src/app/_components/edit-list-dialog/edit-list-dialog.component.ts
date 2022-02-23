import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface EditListDialogData {
    id?: string;
    name?: string;
    description?: string;
    items?: Array<string>;
}

@Component({
    selector: 'app-edit-list-dialog',
    templateUrl: './edit-list-dialog.component.html',
    styleUrls: ['./edit-list-dialog.component.scss'],
})
export class EditListDialogComponent {
    id: string;
    name: string;
    description: string;
    items: Array<string>;

    constructor(@Inject(MAT_DIALOG_DATA) public data: EditListDialogData) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.description = data?.description || '';
        this.items = data?.items || [];
    }

    static open(dialog: MatDialog, data?: EditListDialogData): MatDialogRef<EditListDialogComponent> {
        return dialog.open(EditListDialogComponent, { data: data || {} });
    }
}
