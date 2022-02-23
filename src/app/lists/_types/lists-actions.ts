import { Action } from '../../_types/action';
import { Item } from '../../items/_types/item';

import { List } from './list';

export class LoadLists extends Action {}

export class AddList extends Action {
    constructor(public list: List) {
        super();
    }
}

export class EditList extends Action {
    constructor(public list: List) {
        super();
    }
}

export class DeleteList extends Action {
    constructor(public list: List) {
        super();
    }
}

export class AddItemsToList extends Action {
    constructor(public list: List, public items: Array<Item>) {
        super();
    }
}

export class RemoveItemFromList extends Action {
    constructor(public list: List, public item: Item) {
        super();
    }
}
