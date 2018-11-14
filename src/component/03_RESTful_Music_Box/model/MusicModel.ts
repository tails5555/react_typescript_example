import GenreModel from './GenreModel';
import PublisherModel from './PublisherModel';

class MusicModel {
    private id : number;
    private title : string;
    private singer : string;
    private year : number;
    private genre : GenreModel | null;
    private publisher : PublisherModel | null;

    constructor(id : number, title : string, singer : string, year : number){
        this.id = id;
        this.title = title;
        this.singer = singer;
        this.year = year;
        this.genre = null;
        this.publisher = null;
    }

    set setId(id : number) {
        this.id = id;
    }

    set setTitle(title : string) {
        this.title = title;
    }

    set setSinger(singer : string) {
        this.singer = singer;
    }

    set setYear(year : number) {
        this.year = year;
    }

    set setGenre(genre : GenreModel) {
        this.genre = genre;
    }

    set setPublisher(publisher : PublisherModel) {
        this.publisher = publisher;
    }

    get getId() {
        return this.id;
    }

    get getTitle() {
        return this.title;
    }

    get getSinger() {
        return this.singer;
    }

    get getYear() {
        return this.year;
    }

    get getGenre() {
        return this.genre;
    }

    get getPublisher() {
        return this.publisher;
    }
}

export default MusicModel;