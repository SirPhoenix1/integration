export interface Document {
  _id: string;
  _creationTime: number;
  parentFolder?: string | undefined;
  coverImage?: string | undefined;
  title: string;
  userId: string;
  isArchived: boolean;
  isPublished: boolean;
  content?: string;
  icon?: string;
}

export interface Folder {
  _id: string;
  _creationTime: number;
  parentFolder?: string | undefined;
  coverImage?: string | undefined;
  title: string;
  userId: string;
  isArchived: boolean;
  isPublished: boolean;
}

export type SearchResult = Document | Folder;
