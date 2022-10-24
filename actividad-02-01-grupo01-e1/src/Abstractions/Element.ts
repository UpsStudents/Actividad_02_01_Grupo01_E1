export abstract class Element {
  parent!: Element | null;
  size: number;
  type: string;
  name: string;

  public constructor(type: string, size: number, name: string) {
    this.type = type;
    this.size = size;
    this.name = name;
  }

  setParent(parent: Element | null) {
    this.parent = parent;
  }

  getParent(): Element | null {
    return this.parent;
  }

  public add(component: Element): void {
    if (!this.isComposite()) {
      console.log('This is not a folder');
    }
  }

  public remove(component: Element): void {
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
