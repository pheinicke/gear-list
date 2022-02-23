import { asyncScheduler, BehaviorSubject, concatMap, Observable, observeOn, startWith, Subject } from 'rxjs';

import { LOADING_STATE, StoreState } from '../_types/store-state';
import { Action } from '../_types/action';

export abstract class Store<T extends StoreState> {
    state$: Observable<T>;
    private _state$: BehaviorSubject<T>;
    private _actions$: Subject<Action> = new Subject<Action>();

    protected constructor(initialState: T) {
        this._state$ = new BehaviorSubject<T>(initialState);
        this.state$ = this._state$.asObservable().pipe(observeOn(asyncScheduler));
        this._actions$
            .pipe(
                observeOn(asyncScheduler),
                concatMap((action) => this.handleAction(action)),
                startWith(LOADING_STATE as StateUpdate<T>)
            )
            .subscribe((stateUpdate) => this.updateState(stateUpdate));
    }

    get state(): T {
        return this._state$.getValue();
    }

    protected abstract handleAction(action: Action): Observable<StateUpdate<T>>;

    protected dispatch(...actions: Array<Action>): void {
        actions.forEach((action) => this._actions$.next(action));
    }

    private updateState(update: Partial<T>): void {
        this.setState({ ...this.state, ...update });
    }

    private setState(state: T): void {
        this._state$.next(state);
    }
}

export type StateUpdate<T extends StoreState> = Partial<T>;
