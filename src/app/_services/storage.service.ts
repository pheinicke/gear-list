import { Injectable } from '@angular/core';

import { Item } from '../items/_types/item';
import { List } from '../lists/_types/list';

const ITEMS_STORAGE_KEY = 'gear_list_items';
const LISTS_STORAGE_KEY = 'gear_list_lists';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    loadItems(): Array<Item> {
        const storedItems = localStorage.getItem(ITEMS_STORAGE_KEY);
        return storedItems ? JSON.parse(storedItems) : [];
    }

    setItems(items: Array<Item>): void {
        localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    }

    loadLists(): Array<List> {
        const storedLists = localStorage.getItem(LISTS_STORAGE_KEY);
        return storedLists ? JSON.parse(storedLists) : [];
    }

    setLists(lists: Array<List>): void {
        localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(lists));
    }
}
