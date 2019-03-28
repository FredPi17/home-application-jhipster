export interface IMeteo {
    id?: number;
}

export class Meteo implements IMeteo {
    constructor(public id?: number) {}
}
