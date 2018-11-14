class GenreModel {
    private id : number;
    private name : string;

    constructor(id : number, name : string){
        this.id = id;
        this.name = name;
    }

    set setId(id : number){
        this.id = id;
    }

    set setName(name : string){
        this.name = name;
    }

    get getId(){
        return this.id;
    }

    get getName(){
        return this.name;
    }
}

export default GenreModel;