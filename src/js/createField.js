class square { 
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.clicked = false;
        this.createSquare();


    }
    createSquare() {
        this.square = document.createElement("div");
        this.square.setAttribute("class",'square');

        
        return this;
    }

    drawPicture(picture) {
            this.square.setAttribute("background-image",picture);
    }
    resetSquare() {
        this.clicked = false;
        this.square.setAttribute("background-image","inherit");
    }
}


class Field {
    constructor(number) {
        this.number = number;
        this.krestiky = [];
        this.noliky = [];

        this.createField();
        this.createCheckRoutes();

    }
    createField() {
        let squares = new Array(this.number);
        let krestiky = new Array(this.number);
        let noliky= new Array(this.number);

        for(let i =0; i < this.number; i++) {
            krestiky[i] = new Array(this.number);
            noliky[i] = new Array(this.number);
        }


        let lineSquare = [];
        let field = document.createElement("div");
        field.setAttribute('class','field');

        let fieldRow;
        
        for(let i =0;i<this.number;i++) {
            lineSquare = [];
            fieldRow = document.createElement("div");
            fieldRow.setAttribute("class","fieldRow");

            for(let j=0;j<this.number;j++) {
                lineSquare.push(new square(j,i));
                fieldRow.appendChild(lineSquare[j].square);
            }
            field.appendChild(fieldRow);

            squares[i] = [...lineSquare];
        }

        this.squares = squares;
        this.krestiky = krestiky;
        this.noliky = noliky;

        console.log(this.krestiky);
        console.log(this.noliky);

        this.field = field;

    }


    createCheckRoutes() {
            let route;
            let routes = new Array(this.number);

            for(let i=0; i< this.number; i++) {

                routes[i] = new Array(this.number);

                for(let j=0; j< this.number; j++) {
                    
                    route = new Object;
                    route.right = false;
                    route.down  = false;
                    route.diagRight  = false;
                    route.diagLeft = false;

                    routes[i][j] = route;
                }
            }

           
            for(let i =0; i < this.number; i++) {
                
                for(let j =0; j < this.number; j++) {

                    if(this.squares[i][j].x === 0 && this.squares[i][j].y === 0) {
                        routes[i][j].right = true;
                        routes[i][j].down = true;
                        routes[i][j].diagRight = true;

                    } else if(this.squares[i][j].number === this.squares[i][j].y) {
                        
                        routes[i][j].down = true;
                        routes[i][j].diagLeft = true;

                    } else if(this.squares[i][j].y === 0) {
                        
                        routes[i][j].down = true;

                    } else if(this.squares[i][j].x === 0) {
                        
                        routes[i][j].right = true;
                    } 
                }
            }
            this.routes = routes;
        }


}


export default Field
