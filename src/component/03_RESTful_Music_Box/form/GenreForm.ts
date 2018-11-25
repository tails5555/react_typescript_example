class GenreForm {
    private name : string;
    
    constructor(name : string) {
        this.name = name;
    }

    set setName(name : string) {
        this.name = name;
    }

    get getName() {
        return this.name;
    }
}

export default GenreForm;