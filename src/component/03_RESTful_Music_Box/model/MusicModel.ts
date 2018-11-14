import GenreModel from './GenreModel';
import PublisherModel from './PublisherModel';

class MusicModel {
    private id : number;
    private title : string;
    private singer : string;
    private year : number;
    private genre : GenreModel | null;
    private genreId : number;
    private publisher : PublisherModel | null;
    private publisherId : number;

    constructor(id : number, title : string, singer : string, year : number, genreId : number, publisherId : number){
        this.id = id;
        this.title = title;
        this.singer = singer;
        this.year = year;
        this.genre = null;
        this.genreId = genreId;
        this.publisher = null;
        this.publisherId = publisherId;
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

    set setGenreId(genreId : number) {
        this.genreId = genreId;
    }

    set setPublisher(publisher : PublisherModel) {
        this.publisher = publisher;
    }

    set setPublisherId(publisherId : number) {
        this.publisherId = publisherId;
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

    get getGenreId(){
        return this.genreId;
    }

    get getPublisher() {
        return this.publisher;
    }

    get getPublisherId() {
        return this.publisherId;
    }
}

export default MusicModel;