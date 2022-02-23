import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { StorageService } from '../../_services/storage.service';
import { List } from '../_types/list';

@Injectable({
    providedIn: 'root',
})
export class ListsService {
    constructor(private storageService: StorageService) {}

    loadLists(): Observable<Array<List>> {
        return of(this.storageService.loadLists());
    }

    updateLists(lists: Array<List>): void {
        this.storageService.setLists(lists);
    }
}
