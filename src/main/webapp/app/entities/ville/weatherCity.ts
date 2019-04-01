export class WeatherCity {
    private _Name: string;
    private _Temperature: string;
    private _MaxTemperature: string;
    private _MinTemperature: string;
    private _Humidity: string;
    private _Sunrise: string;
    private _Sunset: string;
    private _Clouds: string;
    private _WindDegree: string;
    private _WindSpeed: string;
    private _Logo: string;
    private _id: number;

    constructor(
        id: number,
        Name: string,
        Temperature: string,
        MaxTemperature: string,
        MinTemperature: string,
        Humidity: string,
        Sunrise: string,
        Sunset: string,
        Clouds: string,
        WindDegree: string,
        WindSpeed: string,
        Logo: string
    ) {
        this._id = id;
        this._Name = Name;
        this._Temperature = Temperature;
        this._MaxTemperature = MaxTemperature;
        this._MinTemperature = MinTemperature;
        this._Humidity = Humidity;
        this._Sunrise = Sunrise;
        this._Sunset = Sunset;
        this._Clouds = Clouds;
        this._WindDegree = WindDegree;
        this._WindSpeed = WindSpeed;
        this._Logo = Logo;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get Name(): string {
        return this._Name;
    }

    set Name(value: string) {
        this._Name = value;
    }

    get Temperature(): string {
        return this._Temperature;
    }

    set Temperature(value: string) {
        this._Temperature = value;
    }

    get MaxTemperature(): string {
        return this._MaxTemperature;
    }

    set MaxTemperature(value: string) {
        this._MaxTemperature = value;
    }

    get MinTemperature(): string {
        return this._MinTemperature;
    }

    set MinTemperature(value: string) {
        this._MinTemperature = value;
    }

    get Humidity(): string {
        return this._Humidity;
    }

    set Humidity(value: string) {
        this._Humidity = value;
    }

    get Sunrise(): string {
        return this._Sunrise;
    }

    set Sunrise(value: string) {
        this._Sunrise = value;
    }

    get Sunset(): string {
        return this._Sunset;
    }

    set Sunset(value: string) {
        this._Sunset = value;
    }

    get Clouds(): string {
        return this._Clouds;
    }

    set Clouds(value: string) {
        this._Clouds = value;
    }

    get WindDegree(): string {
        return this._WindDegree;
    }

    set WindDegree(value: string) {
        this._WindDegree = value;
    }

    get WindSpeed(): string {
        return this._WindSpeed;
    }

    set WindSpeed(value: string) {
        this._WindSpeed = value;
    }

    get Logo(): string {
        return this._Logo;
    }

    set Logo(value: string) {
        this._Logo = value;
    }
}
