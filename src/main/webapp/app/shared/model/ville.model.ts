export interface IVille {
    id?: number;
    name?: string;
}

export class Ville implements IVille {
    constructor(public id?: number, public name?: string) {}
}
