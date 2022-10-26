import { FileSystemObject } from '../Abstractions/FileSystemObject'
import { ElementType } from '../Enums/ElementType'

export class Folder extends FileSystemObject {
    children: FileSystemObject[] = [];

    public constructor(name: string) {
        super(ElementType.FOLDER, 0, name);
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
        let totalSize: number = 0;

        this.children.forEach(function (element) {
            totalSize += element.getSize();
        })

        return totalSize;
    }

    public getName(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.getName());
        }

        return `Directorio(${results.join('+')})` + ", size: " + this.getSize();
    }
}