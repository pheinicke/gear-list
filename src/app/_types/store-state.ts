export interface StoreState {
    status: Status;
}

export interface Status {
    loading: boolean;
    error?: Error;
    idle: boolean;
}

export const IDLE_STATUS: Status = {
    loading: false,
    error: undefined,
    idle: true,
};

export const LOADING_STATUS: Status = {
    loading: true,
    error: undefined,
    idle: false,
};

export function errorStatus(error: Error): Status {
    return {
        loading: false,
        error: error,
        idle: false,
    };
}

export const IDLE_STATE: Partial<StoreState> = {
    status: IDLE_STATUS,
};

export const LOADING_STATE: Partial<StoreState> = {
    status: LOADING_STATUS,
};

export function errorState(error: Error): Partial<StoreState> {
    return {
        status: errorStatus(error),
    };
}
