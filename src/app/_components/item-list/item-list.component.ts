import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import { Item } from '../../items/_types/item';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnDestroy {
    @Input() selectable = false;
    @Input() columns = ['name', 'description', 'weight', 'category'];
    @Output() editItemClick = new EventEmitter<Item>();
    @Output() deleteItemClick = new EventEmitter<Item>();
    @Output() selectionChanged = new EventEmitter<Array<Item>>();
    selectionSubscription: Subscription;
    selection = new SelectionModel<Item>(true, []);
    dataSource = new MatTableDataSource<Item>();

    @Input() set items(items: Array<Item>) {
        this.dataSource.data = items;
    }

    ngOnInit(): void {
        if ((this.editItemClick.observed || this.deleteItemClick.observed) && !this.columns.includes('actions')) {
            this.columns.push('actions');
        }
        if (this.selectable && !this.columns.includes('select')) {
            this.columns.unshift('select');
        }
        this.selectionSubscription = this.selection.changed.subscribe(() => {
            this.selectionChanged.emit(this.selection.selected);
        });
    }

    ngOnDestroy(): void {
        this.selectionSubscription?.unsubscribe();
    }

    applyFilter(filter: string): void {
        this.dataSource.filter = filter.trim().toLowerCase();
    }

    onEditItemClick(event: Event, item: Item): void {
        event.stopImmediatePropagation();
        this.editItemClick.emit(item);
    }

    onDeleteItemClick(event: Event, item: Item): void {
        event.stopImmediatePropagation();
        this.deleteItemClick.emit(item);
    }

    onRowClick(item: Item): void {
        if (this.selectable) {
            this.selection.toggle(item);
        }
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.filteredData.length;
        return numSelected === numRows;
    }

    toggleSelectAll(): void {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.filteredData.forEach((row) => this.selection.select(row));
    }
}
