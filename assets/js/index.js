// Main js file

// another js file (example)
//import Stat from './Stat.js'
import  createField from './createField.js'
import  players from './createPlayers.js'
import  krestikiNoliki from './krestiki-noliki.js'



let screen = document.getElementById('screen');
let buttonReset  = document.getElementById('resetButton');

let krn = new krestikiNoliki(players,screen,createField,buttonReset);