import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith, Subject } from 'rxjs';

import { Item } from '../../items/_types/item';

export interface EditItemDialogData {
    item?: Item;
    categories: Array<string>;
}

@Component({
    selector: 'app-edit-item-dialog',
    templateUrl: './edit-item-dialog.component.html',
    styleUrls: ['./edit-item-dialog.component.scss'],
})
export class EditItemDialogComponent implements OnInit {
    id: string;
    name: string;
    category: string;
    description: string;
    weight: string;
    categories: Array<string>;
    filteredCategories$: Observable<Array<string>>;
    categoriesFilter$ = new Subject<string>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: EditItemDialogData) {
        this.id = data.item?.id || '';
        this.name = data.item?.name || '';
        this.category = data.item?.category || '';
        this.description = data.item?.description || '';
        this.weight = data.item?.weight || '0';
        this.categories = data.categories;
    }

    static open(dialog: MatDialog, data: EditItemDialogData): MatDialogRef<EditItemDialogComponent> {
        return dialog.open(EditItemDialogComponent, { data });
    }

    ngOnInit(): void {
        this.filteredCategories$ = this.categoriesFilter$.pipe(
            startWith(''),
            map((filterValue) =>
                filterValue
                    ? this.categories.filter((category) => category?.toLowerCase()?.includes(filterValue.toLowerCase()))
                    : this.categories.slice()
            )
        );
    }

    applyCategoriesFilter(filter: string): void {
        this.categoriesFilter$.next(filter);
    }
}
