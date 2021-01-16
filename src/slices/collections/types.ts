export interface CollectionsState {
  collections: Collections[];
}

export interface Collections {
  name: string;
  gists: string[];
}

export interface Collection {
  name: string;
  gist: string;
}
