import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-context',
    templateUrl: './context.component.html',
    styleUrls: ['./context.component.scss'],
})
export class ContextComponent {
    constructor(private dialog: MatDialog) {}
}
