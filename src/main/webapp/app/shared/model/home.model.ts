export interface IHome {
    id?: number;
}

export class Home implements IHome {
    constructor(public id?: number) {}
}
