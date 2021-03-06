class krestikiNoliki {
    constructor(players, screen, createField, buttonResetGame) {
        
        this.players = players;
        this.screen = screen;
        this.createField = createField;
        this.buttonResetGame = buttonResetGame;
        this.FieldSize  = 3;
        
        this.Field = new createField (this.FieldSize);
        this.players[0].mainPlayer = true;
        this.screen.appendChild(this.Field.fieldHTML);
        this.initEventClickOnSquare();
        this.initEventResetGame();

    }

    initEventResetGame() {
        
        this.buttonResetGame.addEventListener("click",   function () {  
            this.resetGame();
        }.bind(this));
    }

    resetGame() {
        this.Field.resetField();
        this.players[0].mainPlayer = true;
        this.players[1].mainPlayer = false;
    }

    initEventClickOnSquare() {
        
        for(let i =0; i< this.Field.number; i++) {
            for(let j=0; j< this.Field.number; j++) {
                
                let clickOnSquareEv = function() {
                    
                    let thatSquare = this.Field.squares[i][j];

                    if(thatSquare.access === true) {
                        this.refreshGame(thatSquare);
                    }

                    thatSquare.access = false;

                }.bind(this)
  
                
                this.Field.squares[i][j].squareHTML.addEventListener("click",clickOnSquareEv);
            }
        }
    }

    findMainPlayer() {
        let MainPlayer;

        for(let i = 0; i< this.players.length; i++) {
            if(this.players[i].mainPlayer === true) {
                MainPlayer = this.players[i];
            }
        }
        return MainPlayer;
        
    }


    refreshGame(clickedSquare) {
        let player = this.findMainPlayer();
        
        clickedSquare.drawPicture(player.symbol); 
        this.addSquare(player,clickedSquare);
        let checkResult  = this.checkWon(player);

        if(checkResult.Won === true) {
            this.representRoute(checkResult.route);
            this.representWinner(player);
            this.offFieldAccess();
        } else {    
            this.changePlayer()
        }

    }

    addSquare(player,square) {

        let x = square.x;
        let y = square.y;

        if(player.symbol ==="Krestiki") {
            this.Field.krestiky[y][x] = square;
        } else {
            this.Field.noliky[y][x] = square;
        }

    }

    offFieldAccess() {

        for(let i = 0; i< this.Field.number; i++) {

            for(let j = 0; j < this.Field.number; j++) {
                
                this.Field.squares[i][j].access = false; 
            }
        }
    }

    representRoute(route) {
        for(let i = 0; i < this.Field.number; i++) {
            route[i].squareHTML.style.border = "1px solid Red";
        }
    }

    representWinner(player) {
        alert("Winner: \ "+player.name);
    }

    changePlayer() {

        for(let i =0; i< this.players.length; i++) {
            this.players[i].mainPlayer = !this.players[i].mainPlayer; 
        }
        
    }

    checkWon(player) {

            let checkArray;
            let checkedResult = new Object;
            
            checkedResult.Won = false;
            checkedResult.Route = [];
            if(player.symbol === "Krestiki") {

                checkArray = this.Field.krestiky;

            } else if(player.symbol === "Noliki") {
                    
                checkArray = this.Field.noliky;

            }

            for(let i = 0; i < this.Field.number; i++) {
                    for(let j = 0; j < this.Field.number; j++) {

                            if(typeof(checkArray[i][j]) !== "undefined") {
                                if(this.Field.routes[i][j].right === true) {

                                    checkedResult  = this.checkRightWon(checkArray,j,i);                
                                }

                                if(this.Field.routes[i][j].down === true && checkedResult.Won=== false) {
                                    
                                    checkedResult  = this.checkDownWon(checkArray,j,i);
                                }

                                
                                if(this.Field.routes[i][j].diagRight === true && checkedResult.Won=== false) {

                                    checkedResult  = this.checkDiagRightWon(checkArray,j,i);

                                }

                                if(this.Field.routes[i][j].diagLeft === true && checkedResult.Won=== false) {

                                    checkedResult  = this.checkDiagLeftWon(checkArray,j,i);

                                }


                                if(checkedResult.Won === true) {
                                    return checkedResult;
                                }

                            }
                    }
            }

            return checkedResult;
     
           
        }


        checkRightWon(checkArray,x,y) {
     
            let checkedResult = new Object;
            let Won = true;
            let route = new Array(this.Field.number);
            for(let i = 0; i < this.Field.number; i++) {


               if(typeof(checkArray[y][x+i]) === "undefined") {
                    Won = false;
               }    
               
               route[i] = checkArray[y][x+i];
            }

           
            checkedResult.Won = Won;
            checkedResult.route = route;

            return checkedResult;
        }

        checkDownWon(checkArray,x,y) {             
            let checkedResult = new Object;
            let Won = true;
            let route = new Array(this.Field.number);
            for(let i = 0; i < this.Field.number; i++) {
               if(typeof(checkArray[y+i][x]) === "undefined") {
                    Won = false;
               }      

               route[i] = checkArray[y+i][x];
            }
            checkedResult.Won = Won;
            checkedResult.route = route;

            return checkedResult;

        }

        checkDiagRightWon(checkArray,x,y) {
            let checkedResult = new Object;
            let Won = true;
            let route = new Array(this.Field.number);
            for(let i = 0; i < this.Field.number; i++) {
               if(typeof(checkArray[y+i][x+i]) === "undefined") {
                    Won = false;
               }    
               route[i] = checkArray[y+i][x+i];
            }
            checkedResult.Won = Won;
            checkedResult.route = route;

            return checkedResult;

        }

        checkDiagLeftWon(checkArray,x,y)  {
            let checkedResult = new Object;
            let Won = true;
            let route = new Array(this.Field.number);
            

            for(let i = 0; i < this.Field.number; i++) {
            
               if(typeof(checkArray[y+i][x-i]) === "undefined") {
                    Won = false;
               }      

               route[i] = checkArray[y+i][x-i];
            }

            checkedResult.Won = Won;
            checkedResult.route = route;

            return checkedResult;
        }

        
    }
  

    export default krestikiNoliki