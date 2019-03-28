export interface IVille {
    id?: number;
}

export class Ville implements IVille {
    constructor(public id?: number) {}
}
