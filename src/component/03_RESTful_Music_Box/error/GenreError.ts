class GenreError {
    private nameMessage : string;
    
    constructor(nameMessage : string) {
        this.nameMessage = nameMessage;
    }

    set setNameMessage(nameMessage : string) {
        this.nameMessage = nameMessage;
    }

    get getNameMessage() {
        return this.nameMessage;
    }
}

export default GenreError;