export interface CollectionsState {
    readonly collections: Collections[];
}

export interface Collections {
    readonly name: string;
    readonly gists: string[];
}

export interface Collection {
    readonly name: string;
    readonly gist: string;
}
