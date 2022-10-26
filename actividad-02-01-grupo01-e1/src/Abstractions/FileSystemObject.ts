export abstract class FileSystemObject {
  parent!: FileSystemObject | null;
  id: number;
  size: number;
  type: string;
  name: string;

  public constructor(type: string, size: number, name: string) {
    this.type = type;
    this.size = size;
    this.name = name;
  }

  setParent(parent: FileSystemObject | null) {
    this.parent = parent;
  }

  getParent(): FileSystemObject | null {
    return this.parent;
  }

  public add(component: FileSystemObject): void {
    if (!this.isComposite()) {
      console.log('This is not a folder');
    }
  }

  public remove(component: FileSystemObject): void {
    if (!this.isComposite()) {
      console.log('This is not a folder');
    }
  }

  public isComposite(): boolean {
    return false;
  }

  public abstract getSize(): number;

  public abstract getName(): string;
}
