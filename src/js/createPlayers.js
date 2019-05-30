class player {
    constructor(name,picture,symbol) {
        this.name = name;
        this.picture = picture;
        this.mainPlayer = false;
        this.symbol = symbol;
    }
}

let players = [new player("Саня","","Krestiki"), new player("Игорь","","Noliki")];

console.log(players);
export default players