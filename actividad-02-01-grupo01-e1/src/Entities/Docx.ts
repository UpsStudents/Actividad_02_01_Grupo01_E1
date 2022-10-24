import { Element } from '../Abstractions/Element'

export class Docx extends Element {
    public constructor(
        size: number,
        name: string) {
        super('docx', size, name)
    }

    public getSize(): number {
        return this.size;
    }

    public getName(): string {
        return '"archivo": {' + '"name":' + this.name + '.' + this.type + '", "size": "' + this.getSize() + ' Kb"}';
    }
}