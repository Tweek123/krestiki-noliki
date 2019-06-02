class player {
    constructor(name,symbol) {
        this.name = name;
        this.mainPlayer = false;
        this.symbol = symbol;
    }
}

let players = [new player("Саня","Krestiki"), new player("Игорь","Noliki")];

export default players