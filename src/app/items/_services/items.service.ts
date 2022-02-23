import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { StorageService } from '../../_services/storage.service';
import { Item } from '../_types/item';

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    constructor(private storageService: StorageService) {}

    loadItems(): Observable<Array<Item>> {
        return of(this.storageService.loadItems());
    }

    updateItems(items: Array<Item>): void {
        this.storageService.setItems(items);
    }
}
