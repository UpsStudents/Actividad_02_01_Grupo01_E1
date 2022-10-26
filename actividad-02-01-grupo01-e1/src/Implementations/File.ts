import { FileSystemObject } from '../Abstractions/FileSystemObject'

export class File extends FileSystemObject {
  public constructor(type: string, size: number, name: string) {
    super(type, size, name);
  }

  public getSize(): number {
    return this.size;
  }

  public getName(): string {
    return '"type": ' + this.type + 'name:' + this.name + '.' + this.type + ', size: ' + this.getSize() + ", parentId: " + this.parent.id;
  }
}
