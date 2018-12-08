class MusicForm {
    private title : string;
    private singer : string;
    private year : string;
    private genreId : number;
    private publisherId : number;
    
    constructor(title : string, singer : string, year : string, genreId : number, publisherId : number) {
        this.title = title;
        this.singer = singer;
        this.year = year;
        this.genreId = genreId;
        this.publisherId = publisherId;
    }

    set setTitle(title : string) {
        this.title = title;
    }

    set setSinger(singer : string) {
        this.singer = singer;
    }

    set setYear(year : string) {
        this.year = year;
    }

    set setGenreId(genreId : number) {
        this.genreId = genreId;
    }

    set setPublisherId(publisherId : number) {
        this.publisherId = publisherId;
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

    get getGenreId() {
        return this.genreId;
    }

    get getPublisherId() {
        return this.publisherId;
    }
}

export default MusicForm; 