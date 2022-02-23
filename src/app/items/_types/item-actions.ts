import { Action } from '../../_types/action';

import { Item } from './item';

export class LoadItems extends Action {}

export class AddItem extends Action {
    constructor(public item: Item) {
        super();
    }
}

export class EditItem extends Action {
    constructor(public item: Item) {
        super();
    }
}

export class DeleteItem extends Action {
    constructor(public item: Item) {
        super();
    }
}
