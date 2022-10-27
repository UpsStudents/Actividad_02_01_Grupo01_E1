import { FileSystemObject } from '../Abstractions/FileSystemObject';
import { ElementType } from '../Enums/ElementType';

export class Folder extends FileSystemObject {
  children: FileSystemObject[] = [];

  public constructor(id = 0, name: string, size = 0, parent = null) {
    super(id, ElementType.FOLDER, size, name, parent);
  }

  public add(component: FileSystemObject): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: FileSystemObject): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public getSize(): number {
    let totalSize = 0;

    this.children.forEach(function (element) {
      totalSize += element.getSize();
    });

    return totalSize;
  }

  public getName(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.getName());
    }

    return `Directorio(${results.join('+')})` + ', size: ' + this.getSize();
  }
}
