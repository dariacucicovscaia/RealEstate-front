class Address{
    private _id : bigint;
    private _fullAddress : string;
    private _city : string;
    private _country : string;

    constructor(id: bigint, fullAddress: string, city: string, country: string) {
        this._id = id;
        this._fullAddress = fullAddress;
        this._city = city;
        this._country = country;
    }


    get id(): bigint {
        return this._id;
    }

    set id(value: bigint) {
        this._id = value;
    }

    get fullAddress(): string {
        return this._fullAddress;
    }

    set fullAddress(value: string) {
        this._fullAddress = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }
}export{Address}