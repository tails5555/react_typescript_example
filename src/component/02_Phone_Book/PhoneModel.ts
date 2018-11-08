class PhoneModel {
    private id : number;
    private name : string;
    private address : string;
    private phones : string[];

    constructor(id : number, name : string, address : string, phones : string[]) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phones = phones;
    }

    get getId() : number {
        return this.id;
    }

    get getName() : string {
        return this.name;
    }

    get getAddress() : string {
        return this.address;
    }

    get getPhone() : string[] {
        return this.phones;
    }
}

export default PhoneModel;