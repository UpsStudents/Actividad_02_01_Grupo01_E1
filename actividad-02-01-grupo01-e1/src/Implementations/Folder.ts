import { FileSystemObject } from '../Abstractions/FileSystemObject'
import { ElementType } from '../Enums/ElementType'

export class Folder extends FileSystemObject {
    elements: FileSystemObject[] = [];

    public constructor(name: string) {
        super(ElementType.FOLDER, 0, name);
    }


    public add(component: FileSystemObject): void {
        this.elements.push(component);
        component.setParent(this);        
    }

    public remove(component: FileSystemObject): void {
        const componentIndex = this.elements.indexOf(component);
        this.elements.splice(componentIndex, 1);
        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    public getSize(): number {
        let totalSize: number = 0;

        this.elements.forEach(function (element) {
            totalSize += element.getSize();
        })

        return totalSize;
    }

    public getName(): string {
        const results = [];
        for (const child of this.elements) {
            results.push(child.getName());
        }

        return `Directorio(${results.join('+')})` + ", size: " + this.getSize();
    }
}