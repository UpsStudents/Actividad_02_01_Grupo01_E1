import { ElementType } from '../Enums/ElementType'

export class FileSystemRequestDTO {
  objetos: FolderDTO[] | FileDTO[];
}

export class FolderDTO {
  name: string;
  type: string;
  size: number;
  children: Object[];
}

export class FileDTO {
  name: string;
  type: ElementType;
  size: number;
}