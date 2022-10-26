import { ElementType } from '../Enums/ElementType';

export class FileSystemRequestDTO {
  files: FileDTO[] = [];
}

export class FileDTO {
  id: number;
  name: string;
  type: ElementType;
  size: number;
  children: FileDTO[] | null;
}
