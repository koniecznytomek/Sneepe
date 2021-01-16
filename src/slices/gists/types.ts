export interface GistsState {
  readonly gists: Gists[];
}

export interface Gists {
  name: string;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  isPublic: boolean;
  isFork: boolean;
  viewerHasStarred: boolean;
  stargazerCount: number;
  files: Files[];
}

export interface Files {
  name: string;
  text: string;
  extension?: string;
  size?: number;
  language?: {
    name: string;
    color: string;
  };
}

export interface File {
  name: string;
  filename: string;
  text: string;
}
