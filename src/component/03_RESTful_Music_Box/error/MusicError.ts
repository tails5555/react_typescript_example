class MusicError {
    private titleMessage : string;
    private singerMessage : string;
    private yearMessage : string;
    
    constructor(titleMessage : string, singerMessage : string, yearMessage : string) {
        this.titleMessage = titleMessage;
        this.singerMessage = singerMessage;
        this.yearMessage = yearMessage;
    }

    set setTitleMessage(titleMessage : string) {
        this.titleMessage = titleMessage;
    }

    set setSingerMessage(singerMessage : string) {
        this.singerMessage = singerMessage;
    }

    set setYearMessage(yearMessage : string) {
        this.yearMessage = yearMessage;
    }

    get getTitleMessage() {
        return this.titleMessage;
    }

    get getSingerMessage() {
        return this.singerMessage;
    }

    get getYearMessage() {
        return this.yearMessage;
    }
}

export default MusicError;