import { Element } from '../Abstractions/Element'

export class Xlxs extends Element {

    public constructor(
        size: number,
        name: string) {
        super('xlsx', size, name)
    }

    public getSize(): number {
        return this.size;
    }

    public getName(): string {
        return '"archivo": {' + '"name":' + this.name + '.' + this.type + '", "size": "' + this.getSize() + ' Kb"}';
    }
}