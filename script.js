const circle = document.querySelector("#circle1");
const circle2 = document.querySelector("#circle2");
const competition = document.querySelector(".competition");
const finishPage = document.querySelector(".finish");
const textBox = document.querySelector("#text-box");
const competitionScreen = document.querySelector(".competition");
const mainText = document.querySelector("#main-text");
const startbutton = document.querySelector("#start-button");
const timer = document.querySelector("#counter");
const word = document.querySelector("#word");
const okayButton = document.querySelector("#okay-button");
const pointShower = document.querySelector("#point");
const passButton = document.querySelector("#pass-button");
const loginButton = document.querySelector("#login-button");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginError = document.querySelector("#login-error");
const welcomeSign = document.querySelector("#welcome");
const loginTable = document.querySelector(".login");
const informationTable = document.querySelector(".information");
const personalName = document.querySelector("#personal-name");
const bestTable = document.querySelector("#best-score");
const words = ["car","flower","love","counter","assets","indicate","deliberate","beauty"];
const pronouns = ["who","when","which"];
let usedNumbers = [];
let competitionTime = 60;
let bestScore = localStorage.getItem('bestScore');

startbutton.addEventListener("click",openGame);
okayButton.addEventListener("click", givePoint);
passButton.addEventListener("click",changeWord);
loginButton.addEventListener("click",checkLogin);



function openGame(){
    mainText.style.opacity ="0";
    startbutton.style.opacity = "0";
    competitionScreen.style.display = "block";
    window.setTimeout(close,500);
    let a = setInterval(function(){changeTime(a);},1000);
    circle.className ="circle2";
    circle2.className= "circle1"
    changeWord();
    
}

function close(){
    mainText.style.display ="none";
    startbutton.style.display = "none";
    competitionScreen.style.opacity = "100%";
}
function changeTime(a) {
    if(competitionTime > 1){setTimeout(() => {
        competitionTime = competitionTime - 1;
        timer.innerHTML = competitionTime;
        if(competitionTime == 0){
            updateBest();
            timer.innerHTML = "Time is up!";
            competition.style.display = "none";
            finishPage.style.display = "block";
            finishPage.style.opacity = "100%";
            finishPage.lastElementChild.innerHTML = part1.point;
            
        }
    }, 1000);}
    else{
        
        clearInterval(a);
    }   
}

function controlList(list,number){
    let a = 0;
    isThere = false;
    for(let i = list.length; a < i; a++ ){
        if(list[a] == number){
            isThere = true;
        }
    }
    if(isThere){
        return true;
    }
    else{
        return false;
    }
}

function changeWord() {
    let queryNumber = Math.floor(Math.random() * words.length);
    if(controlList(usedNumbers,queryNumber) == false){
        usedNumbers.push(queryNumber); 
        word.innerHTML = words[queryNumber];
    }
    else{
        if( usedNumbers.length != words.length){
        changeWord();
        }
    }
}

function score(){
    let list1 = textBox.value.split(" ");
        if(controlList(list1,word.innerHTML)){
            let a = 0;
            for(let i = list1.length; a < i; a++ ){
                let addingPoint = list1[a].length * 3;
                part1.point += addingPoint;
            }
            a = 0;
            for(let i = pronouns.length; a < i; a++ ){
                if(controlList(list1,pronouns[a])){
                    part1.point += 30;
                }
            }
            let addingTimePoint = competitionTime * 2;
            part1.point += addingTimePoint;
        }
        
    
}

function givePoint(){
    score();
    changeWord();
    pointShower.innerHTML = part1.point;

}

function checkLogin(){
    if( usernameInput.value == part1.username && passwordInput.value == part1.password){
        if( competition.style.display !== "block" && competitionTime != 0){
            mainText.style.display = "block";
            mainText.style.opacity = "100%";
        }
        startbutton.style.opacity = "100";
        welcomeSign.style.opacity = 0;
        welcomeSign.style.display = "none";
        loginTable.style.display = "none";
        informationTable.style.display = "block";
        informationTable.style.opacity = "100%";
        personalName.innerHTML = part1.username;
        bestTable.innerHTML = bestScore;
    }
    else{
        loginError.style.opacity = "100%";
        window.setTimeout(() => {
            loginError.style.opacity = "0";
        },1000);
        
    }
}

function updateBest(){
    if( bestScore < part1.point){
        localStorage.setItem('bestScore',JSON.parse(part1.point));
        bestTable.innerHTML = part1.point;
    }
    
}



class Participants{
    constructor(name,password,time,point){
        this.username = name;
        this.password = password;
        this.time = time;
        this.point = point;
    }
    show(){
        console.log("Name : " + this.name + " Time : " + this.time +" Point : " + this.point);
    }
}

const part1 = new Participants("a","a",60,0);

   
   


