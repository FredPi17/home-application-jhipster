export interface ICameras {
    id?: number;
    name?: string;
    link?: string;
}

export class Cameras implements ICameras {
    constructor(public id?: number, public name?: string, public link?: string) {}
}
