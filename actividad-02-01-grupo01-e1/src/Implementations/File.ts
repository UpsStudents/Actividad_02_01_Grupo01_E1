import { FileSystemObject } from '../Abstractions/FileSystemObject';
import { ElementType } from '../Enums/ElementType';

export class File extends FileSystemObject {
  public constructor(
    id = 0,
    type: ElementType,
    size: number,
    name: string,
    parent = null,
  ) {
    super(id, type, size, name, parent);
  }

  public getSize(): number {
    return this.size;
  }

  public getName(): string {
    return (
      '"type": ' +
      this.type +
      'name:' +
      this.name +
      '.' +
      this.type +
      ', size: ' +
      this.getSize() +
      ', parentId: ' +
      this.parent.id
    );
  }
}
