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
        const lists = storedLists ? JSON.parse(storedLists) : [];
        return lists.map((storedList: StoredList) => {
            const listItemCounts = new Map<string, number>(Object.entries(storedList.items));
            const allItems = this.loadItems();
            const listItems = [...listItemCounts.entries()].map(([id, count]) => {
                const actualItem = allItems.find((item) => item.id === id);
                return actualItem ? { ...actualItem, count } : undefined;
            });
            return {
                ...storedList,
                items: listItems.filter((item) => !!item),
            };
        });
    }

    setLists(lists: Array<List>): void {
        const storedLists = lists.map(toStoredList);
        localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(storedLists));
    }
}

function toStoredList(list: List): StoredList {
    const convertedItems = new Map(
        list.items.map((item) => {
            return [item.id, item.count];
        })
    );
    return {
        ...list,
        items: Object.fromEntries(convertedItems),
    };
}

interface StoredList {
    id: string;
    name: string;
    description: string;
    items: Record<string, number>;
}
