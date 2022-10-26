import { FileSystemObject } from '../Abstractions/FileSystemObject'
import { ElementType } from '../Enums/ElementType'

export class File extends FileSystemObject {
  public constructor(type: ElementType, size: number, name: string) {
    super(type, size, name);
  }

  public getSize(): number {
    return this.size;
  }

  public getName(): string {
    return '"type": ' + this.type + 'name:' + this.name + '.' + this.type + ', size: ' + this.getSize() + ", parentId: " + this.parent.id;
  }
}
