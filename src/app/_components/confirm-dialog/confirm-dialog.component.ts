import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
    title: string;
    message: string;
    confirm?: string;
    dismiss?: string;
    confirmButtonColor?: 'primary' | 'warn';
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
    title: string;
    message: string;
    confirm: string;
    dismiss: string;
    confirmButtonColor: 'primary' | 'warn';

    constructor(@Inject(MAT_DIALOG_DATA) data: ConfirmDialogData) {
        this.title = data.title;
        this.message = data.message;
        this.confirm = data.confirm || 'Ok';
        this.dismiss = data.dismiss || 'Abbrechen';
        this.confirmButtonColor = data.confirmButtonColor || 'primary';
    }

    static open(dialog: MatDialog, data: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent> {
        return dialog.open(ConfirmDialogComponent, { data });
    }
}
