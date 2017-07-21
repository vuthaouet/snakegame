var tablewidth = 15,
table='',
direction='none',
snakeall=[],
x,y,score=0,
time=500;
    for(i=0;i<tablewidth;i++){
        table=table+'<tr>';
        for(j=0;j<tablewidth;j++){
            table=table+'<td></td>';
        }
        table=table+'<tr>';
    }
    document.querySelector("table").innerHTML=table;

snake=Math.floor((Math.random() * tablewidth*tablewidth-1) + 1);
food=Math.floor((Math.random() * tablewidth*tablewidth-1) + 1);
while(food==snake){
    food=Math.floor((Math.random() * tablewidth*tablewidth-1) + 1);
}
snakeall=[snake];

document.querySelectorAll("td")[snake].className="snake";
document.querySelectorAll("td")[food].className="food";

function position(value){
    value++;
    col=Math.floor(value/tablewidth);
    row=value-col*tablewidth;
    col++;
    return [col,row];
}
function deposition(c,r){
    c--;
    return c*tablewidth+(--r);
}

function move(){
y=position(snakeall[0])[0];
x=position(snakeall[0])[1];  
 if(x*1<1 || y*1<1){
            endGame();
 }
    switch (direction){
        case 'left':
            x--;
        break;
        case 'right':
            x++;
        break;
        case 'up':
            y--;
        break;
        case 'down':
            y++;
        break;
        case 'none':

        break;
        
    } 
 if(y*1>tablewidth || x*1>tablewidth){
            endGame();
 }
 if(snakeall.indexOf(deposition(y,x),1)!=-1){
     endGame();
 }       
addStart(y,x);       
setTimeout("move()",time);    
}
function addStart(yPos,xPos){
        removeEnd();
        snakeall.unshift(deposition(yPos,xPos)*1);
        try {
    document.querySelectorAll("td")[snakeall[0]].className="snake"; 
            }
        catch(err) {
   endGame();
    }   
              
}

function removeEnd(){
    if(snakeall[0]!=food){
            document.querySelectorAll("td")[snakeall[snakeall.length-1]].className="";
            snakeall=snakeall.splice(0,snakeall.length-1);
    }else{
        score=score+10;
        document.querySelector("header").innerText="SCORE: "+score;
        food=Math.floor((Math.random() * tablewidth*tablewidth-1) + 1);
while(snakeall.indexOf(food)!=-1){
    food=Math.floor((Math.random() * tablewidth*tablewidth-1) + 1);
}
document.querySelectorAll("td")[food].className="food";
    }
}
function endGame(){
    direction='none';
    time=9999999;
    document.querySelector("#gameover").style.display="block";
    document.querySelector("#score").innerText="SCORE: "+score;
    console.log("ENDGAME");
}
function left(){
if(direction!="right"){
    direction="left";
}
}
function right(){
if(direction!="left"){
    direction="right";
}
}
function up(){
if(direction!="down"){
    direction="up";
}
}
function down(){
if(direction!="up"){
    direction="down";
}
}
function play(gamemode){
    time=gamemode;
    document.querySelector("#start").style.display="none";
    document.querySelector("#mp3").play();
}
move();