let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "purple", "green"];

let started = false;//game has not started yet
let level = 0;

let highest_score = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){ // ek key press hone ke bad game start ho jaye .nhi to agar keys press krte rhenge to game bar bar start hote rhega. 
        started = true;

        levelUp();//when games initial phase start then go for level 1 in this  function 
    }
});

//this flash func is for to flash color when game initialize by pressing a key
function gameFlash(btn){ //flashing div color to white when color is clicked.
    btn.classList.add("flash");//giving the class flash to div whoose type is button.
    // so by giving this class div color will change then,

    //set timeout function is implementing the function in which we are 
    // removing btn class(flash)
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}


//this flash fuc is for to flash color when user clicks color
function userflash(btn){ //flashing div color to green when color is clicked.
    btn.classList.add("userflash");//giving the class userflash to div whoose type is button.
    // so by giving this class div color will change then,

    //set timeout function is implementing the function in which we are 
    // removing flash color by removing btn class(userflash)
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)
}

function levelUp() {
    //ugar user me sare colors sahise enter kiye to userSeq ko khali krna padega aur usne user ke press kiye huye color shuru se add hote rhenge.
    userSeq = [];


    level++; //

    h2.innerText = `Level ${level}`; //update level message

    //random function se random no generate krenge between 0 to 3 bacause out colors are 4 and we made array of colors.
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx]; //color array me se vo idx lo jo randIdx ne generate kr ke diya hai and us idx ka element(color) randColor me store kr do.
    let randbtn = document.querySelector(`.${randColor}`);//we used $ because it is an variable not string.. and why we used `` because we also have to use dot(.) because it uery selector.
    
    
    gameSeq.push(randColor);//stote random color in gameSeq array
    gameFlash(randbtn);

    //highest score
    if(level > highest_score){
        highest_score = level;
    }
}


//matching sequence
function checkAns(idx) {
    //we have to that  every indexes of user sequence and game sequnce is same or not
    //Level is equal to gameSeq and userseq , level increases with correct sequnce.

    // let idx = level - 1; 
    //why idx level -1 
    //ans: let assume ham level 1 pr hai then userSeq and gameSeq me  ek hi element hoga aur first index access  0 se hota hai.. 
    
    //idx = level - 1 is fix on 0th index. but we want last index.
    //in btnPress function me userSeq hai to uska last index hoga userSeq.length-1 and pass in this function as argument. 
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 100);
        }
    } else{
        h2.innerHTML = `Game Over! your score was <b>${level}</b> <br> heighest score is ${highest_score} <br>  Press any key to start again!`;

        //game over then body color res
        document.querySelector("body").style.backgroundColor = "red";
        //then reset the color to white
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },300);


        //game over hone ke bad game reset hona chahiye
        reset();
    }
}

//------------------------
//event listeners

function btnPress() {
    let btn = this; //this -> is the the button(div) that clicked and comming from below-->btn.addEventListener("click",btnPress);
    userflash(btn); //jo button hamne click kiya hai usko flash kra do.
    
    //we want to know about what color user clicked.
    //so we assign id's to all buttons
    //then access color  by id and store in userColor
    userColor = btn.getAttribute("id");

    //then store to useSeq array  kyuki user ke clicked colors ko sotre krna jruri hai.
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");//accessing class btn of 4 divs
for(btn of allBtns){//adding event listiners of all divs
    btn.addEventListener("click",btnPress); //when button will be clicked it goes to execute btnPress function
}


//reset function

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
