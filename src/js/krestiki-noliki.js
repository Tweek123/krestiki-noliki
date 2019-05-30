import  Field from './createField.js'
import  players from './createPlayers.js'

class krestikiNoliki {
    constructor(players, screen, createField, buttonStartGame) {
        
        this.players = players;
        this.screen = screen;
        this.createField = createField;
        this.buttonStartGame = buttonStartGame;
        this.FieldSize  = 3;
        

        this.initEventStartGame();
    }

    initEventStartGame() {


            this.Field = new Field (this.FieldSize);
            this.players[0].mainPlayer = true;

  
        this.checkWon(this.players[0]);
       // this.buttonStartGame.addEventListener("onclick",startGame.bind(this));
    }

    initEventClickOnSquare() {
        
        for(let i =0; i< this.Field.number; i++) {
            for(let j=0; j< this.Field.number; j++) {

                let clickOnSquareEv = function() {

                    let thatSquare = this.Field.squares[i][j];
                    if(thatSquare.clicked === false) {
                       
                        this.refreshGame(thatSquare);
                    
                    }

                }.bind(this)
                
                this.Field.squares[i][j].addEventListener("onclick",clickOnSquareEv)
            }
        }
    }

    changePlayerAndDrawPicture(thatSquare) {
        let Won = false;

        for(let i=0; i<this.players.length;i++){


            if(this.players[i].mainPlayer === true) {                    
                
                x = thatSquare.x;
                y = thatSquare.y;

                if(this.players[i].symbol === "Krestiki") {
                    
                    this.Field.krestiky[x][y] = thatSquare;

                } else if(this.players[i].symbol === "Noliki") {

                    this.Field.noliky[x][y] = thatSquare;

                }

                if(i+1 !== this.players.length) {
                    this.players[i+1].mainPlayer = true; 
                } else {
                    this.players[0].mainPlayer = true;
                }

                thatSquare.drawPicture(this.players[i].picture);
                this.players[i].mainPlayer = false;

                Won = this.checkWon(this.players[i]);

             }
          }   
    }

    findMainPlayer() {
        
    }

    refreshGame(clickedSquare) {

    }

    checkWon(player) {

            let checkArray;

            let Won = false;


            if(player.symbol === "Krestiki") {

                checkArray = this.Field.krestiky;

            } else if(player.symbol === "Noliki") {
                
                checkArray = this.Field.noliky;

            }


            for(let i = 0; i < this.Field.number; i++) {
                    for(let j = 0; j < this.Field.number; j++) {

                            if(typeof(checkArray[i][j]) !== "undefined") {

                                if(this.Field.routes[i][j].right === true) {
                                    
                                    Won  = this.checkRightWon(checkArray,i,j);                
                                }

                                if(this.Field.routes[i][j].down === true) {
                                    
                                    Won  = this.checkDownWon(checkArray,i,j);
                                }

                                
                                if(this.Field.routes[i][j].diagRight === true) {

                                    Won  = this.checkDiagRightWon(checkArray,i,j);

                                }

                                if(this.Field.routes[i][j].diagLeft === true) {

                                    Won  = this.checkDiagLeftWon(checkArray,i,j);

                                }


                                if(Won === true) {
                                    return Won;
                                }

                            }
                    }
            }
           
        }


        checkRightWon(checkArray,x,y) {
            let Won = true;

            for(let i = 0; i < this.number; i++) {
               if(typeof(checkArray[x+i,y]) === "undefined") {
                    Won = false;
               }      
            }

            return Won;
        }

        checkDownWon() {             
            
            let Won = true;

            for(let i = 0; i < this.number; i++) {
               if(typeof(checkArray[x,y+i]) === "undefined") {
                    Won = false;
               }      
            }
            
            return Won;

        }

        checkDiagRightWon() {

            let Won = true;

            for(let i = 0; i < this.number; i++) {
               if(typeof(checkArray[x+i,y+i]) === "undefined") {
                    Won = false;
               }      
            }
            
            return Won;

        }

        checkDiagLeftWon()  {

            let Won = true;

            for(let i = 0; i < this.number; i++) {
               if(typeof(checkArray[x-i,y+i]) === "undefined") {
                    Won = false;
               }      
            }
            return Won;
        }

        
    }





    console.log(players);
    let krn = new krestikiNoliki(players,document.createElement("div"),Field,document.createElement("div"),document.createElement("div"));



    export default krestikiNoliki