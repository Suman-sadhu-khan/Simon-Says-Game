let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let mxScore=0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

let startBtn=document.querySelector("#startBtn");
startBtn.addEventListener("click",function(){

    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
});

let quitBtn=document.querySelector("#quitBtn");
quitBtn.addEventListener("click",function(){
    h3.innerText=``;
    h2.innerHTML=`Press <u>Start Button</u> to start the game.`;
    reset();
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}


function levelUp(){
    userSeq=[];
    
    h3.innerText=``;
    level++;
    h2.innerText=`Level ${level}`;
    //random btn choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);

}

function checkAns(idx){
    // console.log("curr level :",level);
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        
        console.log(mxScore);
        if(mxScore!=0 && level>mxScore){
            h3.innerHTML=`<i> Congratulations &#127881;!! New Highest Score <b>${level}</b></i> `;
            
        }
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>Press <u>Start Button</u> to start.`;
        
        document.querySelector("body").classList.add("bgred")

        setTimeout(function(){
            document.querySelector("body").classList.remove("bgred");
        },150);
        reset();
    }
}


function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    if(mxScore<level){
        mxScore=level;
    }
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

