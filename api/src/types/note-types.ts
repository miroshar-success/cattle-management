export interface INote {
  id?: string;
  title?: string;
  theme?: string;
  comment: string;
  importance?: EImportance;
  UserId?: string;
}

export enum EImportance {
  Alta = "Alta",
  Media = "Media",
  Baja = "Baja",
}
