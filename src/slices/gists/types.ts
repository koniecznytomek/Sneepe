export interface GistsState {
    readonly gists: Gists[];
}

export interface Gists {
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly pushedAt: string;
    readonly isPublic: boolean;
    readonly isFork: boolean;
    readonly viewerHasStarred: boolean;
    readonly stargazerCount: number;
    readonly files: Files[];
}

export interface Files {
    readonly name: string;
    readonly text: string;
    readonly extension?: string;
    readonly size?: number;
    readonly language?: {
        readonly name: string;
        readonly color: string;
    };
}

export interface File {
    readonly name: string;
    readonly filename: string;
    readonly text: string;
}
