class PhoneForm {
    private name : string;
    private address : string;
    private phones : string[];

    constructor(name : string, address : string, phones : string[]) {
        this.name = name;
        this.address = address;
        this.phones = phones;
    }

    set setName(name : string) {
        this.name = name;
    }

    set setAddress(address : string) {
        this.address = address;
    }

    set setPhones(phones : string[]) {
        this.phones = phones;
    }

    get getName() : string {
        return this.name;
    }

    get getAddress() : string {
        return this.address;
    }

    get getPhones() : string[] {
        return this.phones;
    }
}

export default PhoneForm;