import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ItemAndCount } from '../../_types/item-and-count';

@Component({
    selector: 'app-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
    @Input() columns = ['name', 'description', 'weight', 'category', 'count'];
    @Output() deleteItemClick = new EventEmitter<ItemAndCount>();
    @Output() itemCountChange = new EventEmitter<ItemAndCount>();

    dataSource = new MatTableDataSource<ItemAndCount>();

    @Input() set items(items: Array<ItemAndCount>) {
        this.dataSource.data = items;
    }

    ngOnInit(): void {
        if (this.deleteItemClick.observed && !this.columns.includes('actions')) {
            this.columns.push('actions');
        }
    }

    applyFilter(filter: string): void {
        this.dataSource.filter = filter.trim().toLowerCase();
    }

    onDeleteItemClick(event: Event, item: ItemAndCount): void {
        event.stopImmediatePropagation();
        this.deleteItemClick.emit(item);
    }

    onItemCountChanged(item: ItemAndCount, value: string): void {
        this.itemCountChange.emit({ ...item, count: Number.parseInt(value) });
    }
}
