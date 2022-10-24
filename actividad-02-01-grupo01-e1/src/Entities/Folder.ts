import { Element } from '../Abstractions/Element'

export class Folder extends Element {
    elements: Element[] = [];

    public constructor(name: string) {
        super('', 0, name);
    }

    public add(component: Element): void {
        console.log("ingresa en");
        this.elements.push(component);
        component.setParent(this);
        console.log("Done!");
    }

    public remove(component: Element): void {
        const componentIndex = this.elements.indexOf(component);
        this.elements.splice(componentIndex, 1);
        component.setParent(null);
        console.log("Done!");
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