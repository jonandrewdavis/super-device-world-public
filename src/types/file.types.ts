export enum FileStatus {
  Scheduled = "scheduled",
  Available = "available",
  Pending = "pending",
}

export type FileItem = {
  name: string;
  device: string;
  path: string;
  status: FileStatus;
};
