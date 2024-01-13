let inputDirection ={x:0,y:0};
const foodSound=new Audio("foodSound.mp3");
const gameOverSound=new Audio("gameOverSound.mp3");
const moveSound=new Audio("moveSound.mp3");
const gameSound=new Audio("gameSound.mp3");
let score=0;
let speed=10;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]  //snake array snake will be here by default snake is an array because it will increase when it will eat food
let food={x:6,y:7}; 
   //place of food food is not an array

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
         return;

    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;

        }    
    }
    //collide with the wall
    if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //1.updating the snake array &food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        gameSound.pause();
        inputDirection={x:0,y:0};
        alert("Game Over !! Press any key to continue.....");
        snakeArr=[{x:13,y:15}];
        gameSound.play();
        score=0;
    }
    //if snake has eaten the food then again place the food in other place & increase the score
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score+=1;
        scoreCount.innerHTML="Score:"+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});//incease the body
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())} //to generate new food
        

    }

    //2.randering the snake
    for (let i= snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]}; //new object which only contain snakeArr[i] ,this code is mainly for changing the direction
        
    }
    snakeArr[0].x +=inputDirection.x;
    snakeArr[0].y +=inputDirection.y;



    //dispaly snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');  //new element cretaed
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('sbody');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


//main code
gameSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown" ,e=>{   /*this is for when user will press any key from the keyboard ,this is a function which will 
    listen to that and it will take two args 1. button 2.arrow element*/
    inputDirection={x:0,y:1};   //if user will press any key in the keyboard then the game will start
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x=0;
            inputDirection.y=-1;
            break;    
        case "ArrowDown":
            console.log("ArrowDown")
            inputDirection.x=0;
            inputDirection.y=1;
            break;
         case "ArrowLeft":
            console.log("ArrowLeft")
            inputDirection.x=-1;
            inputDirection.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDirection.x=1;
            inputDirection.y=0;
            break;
    
        default:
            break;
    }

});