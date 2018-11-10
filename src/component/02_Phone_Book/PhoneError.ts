class PhoneError {
    private nameMessage : string;
    private addressMessage : string;
    private phonesMessage : string[];

    constructor(nameMessage : string, addressMessage : string, phonesMessage : string[]) {
        this.nameMessage = nameMessage;
        this.addressMessage = addressMessage;
        this.phonesMessage = phonesMessage;
    }

    set setNameMessage(nameMessage : string) {
        this.nameMessage = nameMessage;
    }

    set setAddressMessage(addressMessage : string) {
        this.addressMessage = addressMessage;
    }

    set setPhonesMessage(phonesMessage : string[]) {
        this.phonesMessage = phonesMessage;
    }

    get getNameMessage() : string {
        return this.nameMessage;
    }

    get getAddressMessage() : string {
        return this.addressMessage;
    }

    get getPhonesMessage() : string[] {
        return this.phonesMessage;
    }
}

export default PhoneError;