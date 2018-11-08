class PhoneForm {
    private name : string;
    private address : string;
    private phones : string[];

    constructor(name : string, address : string, phones : string[]) {
        this.name = name;
        this.address = address;
        this.phones = phones;
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

export default PhoneForm;