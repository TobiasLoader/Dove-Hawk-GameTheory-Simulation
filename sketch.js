
var initDH;

var D;
var H;

var pDove;
var pHawk;

var F;

var gameTheory;

var percentageDove;
var expectedPercentageDove;

var T;

var pairFuncResult;

var current;
var MAX;

var avD;
var avH;

var PLAY;

var scene;

var onlyWholeCreatures;

var chooseStartPoint;

// SCENE 1

var Points;

var Zoom;
var ZSpeed;

var newMouseX;
var newMouseY;

var originTranslation;

var dragX;
var dragY;


// SCENE 2

var doves;
var hawks;

// OTHER

var C; // colours

var firstFrame;

function setup() {
	
	frameRate(15);
	
	width = window.innerWidth;
	height = window.innerHeight;
	  
	initDH = [10,10];
	
	D = initDH[0];
	H = initDH[1];
	
	pDove = D;
	pHawk = H;
	
	F = 9/4;

	gameTheory = [
	    [ 3*F/6,   2*F/6], // Dove: D, H
	    [ 4*F/6,   0*F/6]    // Hawk: D, H
	];
	
	percentageDove = (D/(D + H));
	
	expectedPercentageDove = (gameTheory[1][1]-gameTheory[0][1])/(gameTheory[0][0]-gameTheory[0][1]-gameTheory[1][0]+gameTheory[1][1]);
	
	T = 0;
	
	current = pDove + pHawk;
	MAX = 500;
	
	avD = D;
	avH = H;
	
	PLAY = true;
	
	scene = 1;
		
	onlyWholeCreatures = true;
	
	chooseStartPoint = false;
		
	// SCENE 1
	
	Points = [[D,H]];
	
	Zoom = 1;
	ZSpeed = 0.05;
	
	newMouseX;
	newMouseY;
	
	originTranslation = [width/12,-11*height/12];
	
	dragX = 0;
	dragY = 0;
	
	// SCENE 1
	
	doves = [];
	hawks = [];
	
	for (var i=0; i<D; i+=1){
	    doves.push([random(0,width),random(0,height)]);    
	}
	for (var i=0; i<H; i+=1){
	    hawks.push([random(0,width),random(0,height)]);    
	}
	
	C = [{r:49,g:160,b:206},{r:206,g:95,b:49},{r:250,g:250,b:250},{r:70,g:70,b:70},{r:50,g:50,b:50}];
	// [0]=BLUE, [1]=RED, [2]=WHITE, [3]=GREY1, [4]=GREY2
	
	textFont('Quicksand');
	textAlign(CENTER,CENTER);
	
		
	for (var t=0; t<T; t+=1){
	    nextTimestep();
	}

	canvas = createCanvas(width, height);
	
	firstFrame = true;
}


function pairFunction(){
    // return (1 - (factorial(MAX)/(factorial(MAX - current)*pow(max,current))));
    
    var ANS = 1;
    for (var i=0; i<current; i+=1){
        ANS *= (MAX/2-i)/(MAX/2);
    }
    return 1-ANS;
}

function food(gT){
	if (onlyWholeCreatures){
		if (random(0,1)<gT-floor(gT)){
			return floor(gT)+1;
		} else {
			return floor(gT);
		}
	} else {
		return gT;
	}
}

function deltaD(){
    if (random(0,1)<pairFuncResult){
        if (random(0,1)<percentageDove){
            return food(gameTheory[0][0]);
        } else {
            return food(gameTheory[0][1]);
        }
    } else {
        return F;    
    }
}
function deltaH(){
    if (random(0,1)<pairFuncResult){
        if (random(0,1)<percentageDove){
            return food(gameTheory[1][0]);
        } else {
            return food(gameTheory[1][1]);
        }
    } else {
        return F;    
    }
}

function nextTimestep(){
    D = 0;
    H = 0;
    
    pairFuncResult = pairFunction();
    
    for (var dove=0; dove<pDove; dove+=1){
        D += deltaD();
    }
    for (var hawk=0; hawk<pHawk; hawk+=1){
        H += deltaH();
    }
    
    if (D + H < MAX){current = D + H;}
    else {current = MAX;}
    
    percentageDove = (D/(D + H));
    
    D = round(percentageDove*current);
    H = round((1-percentageDove)*current);
    
    current = D + H;
    
    if (pDove>D){
        for (var i=0; i<pDove-D; i+=1){
            doves.shift();    
        }
    } else {
        for (var i=0; i<D-pDove; i+=1){
            doves.push([random(0,width),random(0,height)]);
        }
    }
    if (pHawk>H){
        for (var i=0; i<pHawk-H; i+=1){
            hawks.shift();    
        }
    } else {
        for (var i=0; i<H-pHawk; i+=1){
            hawks.push([random(0,width),random(0,height)]);
        }
    }
    
    pDove = D;
    pHawk = H;
    
    avD += D;
    avH += H;
    
    Points.push([D,H]);
}

function mX(){ // mouseX
    return mouseX-originTranslation[0]-dragX;    
}
function mY(){ // mouseY
    return -mouseY-originTranslation[1]-dragY;    
}

function zX(X){
    return ((X-newMouseX)/Zoom + newMouseX);    //*(width+height)/1200
}
function zY(Y){
    return ((Y-newMouseY)/Zoom + newMouseY);    //*(width+height)/1200
}

function inverseZX(X){
	return (1200*X/(width+height) - newMouseX)*Zoom + newMouseX;
}
function inverseZY(Y){
	return (1200*Y/(width+height) - newMouseY)*Zoom + newMouseY;
}

function textInfo(){
	noStroke();
    textSize(height/50 + width/160);
    textAlign(RIGHT,CENTER);
    fill(C[3].r,C[3].g,C[3].b);
    text("Press the 'I' key for Instructions",width - 60,3*height/48);
    fill(C[0].r,C[0].g,C[0].b);
    text("Avg Doves: "+round(avD/T),width - 60,9*height/48);
    fill(C[1].r,C[1].g,C[1].b);
    text("Avg Hawks: "+round(avH/T),width - 60,7*height/48);
    fill(C[0].r,C[0].g,C[0].b);
    text("Now Doves: "+round(D),width - 60,16*height/48);
    fill(C[1].r,C[1].g,C[1].b);
    text("Now Hawks: "+round(H),width - 60,14*height/48);
    fill(C[3].r,C[3].g,C[3].b);
    text("Timestep: "+T,width - 60,20*height/48);
}

function axis(){
	strokeWeight(1);
	stroke(C[4].r,C[4].g,C[4].b);
    line(originTranslation[0]+zX(0)+dragX,-originTranslation[1]-zY(0)-dragY,width-5,-originTranslation[1]-zY(0)-dragY);
    line(originTranslation[0]+zX(0)+dragX,-originTranslation[1]-zY(0)-dragY,originTranslation[0]+zX(0)+dragX,5);
    
    line(width-5,-originTranslation[1]-zY(0)-dragY,width-15,-originTranslation[1]-zY(0)-dragY-10);
    line(width-5,-originTranslation[1]-zY(0)-dragY,width-15,-originTranslation[1]-zY(0)-dragY+10);
    line(originTranslation[0]+zX(0)+dragX,5,originTranslation[0]+zX(0)+dragX-10,15);
    line(originTranslation[0]+zX(0)+dragX,5,originTranslation[0]+zX(0)+dragX+10,15);
}

function axisLabels(X,Y,Size){
	noStroke();
	textSize(Size);
    fill(C[1].r,C[1].g,C[1].b);
    textAlign(RIGHT,TOP);
    text(X,width-30,-originTranslation[1]-zY(0)-dragY+Size/2);
    textAlign(RIGHT,CENTER);
    text(Y,originTranslation[0]+zX(0)+dragX-Size/2,30);
}

function axisMarkings(Coor,Value){
	strokeWeight(1);
	noStroke();
    textSize(15/Zoom);
    fill(C[0].r,C[0].g,C[0].b);
    if (Coor==='X'){
		textAlign(CENTER,TOP);
		text(Value,originTranslation[0]+zX(Value)+dragX,-originTranslation[1]-zY(0)-dragY+15/Zoom);
		stroke(C[3].r,C[3].g,C[3].b);
		line(originTranslation[0]+zX(Value)+dragX,-originTranslation[1]-zY(0)-dragY-2,originTranslation[0]+zX(Value)+dragX,-originTranslation[1]-zY(0)-dragY+2);
	}
	if (Coor==='Y'){
		textAlign(RIGHT,CENTER);
		text(Value,originTranslation[0]+zX(0)+dragX-15/Zoom,-originTranslation[1]-zY(Value)-dragY);
		stroke(C[3].r,C[3].g,C[3].b);
		line(originTranslation[0]+zX(0)+dragX-2,-originTranslation[1]-zY(Value)-dragY,originTranslation[0]+zX(0)+dragX+2,-originTranslation[1]-zY(Value)-dragY);
	}
	
}

function scene1(){
    newMouseX = mX();
    newMouseY = mY();
    
    axis();
    push();
    
    scale(1.0,-1.0);
    translate(originTranslation[0]+dragX,originTranslation[1]+dragY);
    
    stroke(C[4].r,C[4].g,C[4].b,100);
    line(zX(0),zY(MAX),zX(MAX),zY(0));
    
    line(zX(0),zY(0),zX(MAX*expectedPercentageDove),zY(MAX*(1-expectedPercentageDove)));
    
    if (chooseStartPoint){
	    fill(C[0].r,C[0].g,C[0].b,20);
	    noStroke();
	    triangle(zX(0),zY(0),zX(MAX),zY(0),zX(0),zY(MAX));
	    if (floor(newMouseX)>=0 && floor(newMouseY)>=0 && floor(newMouseX)+floor(newMouseY)<=MAX){
			cursor('crosshair');
		}
    } else {
	    for (var t=0; t<T; t+=1){
	        strokeWeight(width/(100*Zoom));
	        stroke(C[0].r,C[0].g,C[0].b,15+(240)*pow(1.2,t-T));
	        point(zX(Points[t][0]),zY(Points[t][1]));
	    }
	/*
	    strokeWeight(1);
	    stroke(C[2].r,C[2].g,C[2].b,100);
	    fill(C[0].r,C[0].g,C[0].b);
	    ellipse(zX(Points[Points.length-1][0]),zY(Points[Points.length-1][1]),width/(100*Zoom),width/(100*Zoom));
	    
	*/
	    strokeWeight(2);
	    stroke(C[1].r,C[1].g,C[1].b);
	    fill(C[2].r,C[2].g,C[2].b);
	    ellipse(zX(avD/T),zY(avH/T),10/Zoom,10/Zoom);
	}
    
    pop();
    
    if (chooseStartPoint && (floor(newMouseX)>=0 && floor(newMouseY)>=0 && floor(newMouseX)+floor(newMouseY)<=MAX)){
	    noStroke();
	    fill(C[4].r,C[4].g,C[4].b);
		textAlign(LEFT,CENTER);
		textSize(15);
		text("("+floor(newMouseX)+", "+floor(newMouseY)+")",mouseX+20,mouseY);
	}
    
    for (var i=0; i<=MAX; i+=100){
	    axisMarkings('X',i);
		axisMarkings('Y',i); 
    }
    
    if (MAX % 100){
	    axisMarkings('X',MAX);
	    axisMarkings('Y',MAX);
    }
    
    axisLabels("Dove","Hawk",20/Zoom);

    textInfo();
//     alert(pairFuncResult);
    
}
function scene2(){
    strokeWeight(width/40);
    stroke(C[0].r,C[0].g,C[0].b,100);
    for (var i=0; i<doves.length; i+=1){
        point(doves[i][0],doves[i][1]);
    }
    stroke(C[1].r,C[1].g,C[1].b,100);
    for (var i=0; i<hawks.length; i+=1){
        point(hawks[i][0],hawks[i][1]);
    }
    
/*
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(17*width/24,3*height/96,3*width/12,16*height/48);
*/
    
    textInfo();
}
function scene3(){
    newMouseX = mX();
    newMouseY = mY();
    
    axis();
    
    push();
    
    scale(1.0,-1.0);
    translate(originTranslation[0]+dragX,originTranslation[1]+dragY);
    
    stroke(C[4].r,C[4].g,C[4].b,100);
    line(zX(0),zY(MAX),zX(MAX),zY(MAX));
    
    strokeWeight(2);
    
    if (T<MAX){
        stroke(C[0].r,C[0].g,C[0].b,150);
        for (var i=0; i<T; i+=1){
            line(zX(i),zY(0),zX(i),zY(Points[i][0]));
        }
        stroke(C[1].r,C[1].g,C[1].b,150);
        for (var i=0; i<T; i+=1){
            line(zX(i),zY(Points[i][0]),zX(i),zY(Points[i][1]+Points[i][0]));
        }
    } else {
        stroke(C[0].r,C[0].g,C[0].b,150);
        for (var i=T-MAX; i<T; i+=1){
            line(zX(i-(T-MAX)),zY(0),zX(i-(T-MAX)),zY(Points[i][0]));
        }
        stroke(C[1].r,C[1].g,C[1].b,150);
        for (var i=T-MAX; i<T; i+=1){
            line(zX(i-(T-MAX)),zY(Points[i][0]),zX(i-(T-MAX)),zY(Points[i][1]+Points[i][0]));
        }
    }
    
    pop();
    
    for (var i=0; i<=MAX; i+=100){
		axisMarkings('Y',i); 
    }
    
    axisLabels("Timestep","Total",20/Zoom);
/*
    

    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(17*width/24,3*height/96,3*width/12,16*height/48);
*/
    
    textInfo();    
}

function draw() {
	
	cursor('default');
	background(C[2].r,C[2].g,C[2].b);
	
    switch (scene){
        case 1: scene1(); break;
        case 2: scene2(); break;
        case 3: scene3(); break;
    }
    
/*
    stroke(59, 59, 59);
    strokeWeight(1);
    line(mouseX-7,mouseY-7,mouseX+7,mouseY+7);
    line(mouseX-7,mouseY+7,mouseX+7,mouseY-7);
*/

    if (PLAY){
// 	    if (millis() % 2 === 0){
	        nextTimestep();
	        T+=1;
//         }  
    }
    
    if (firstFrame){
// 	    K72();
	    firstFrame = false;
    }
}

function K8(){
	if (T>1){
	    avD-=Points[Points.length-1][0];
	    avH-=Points[Points.length-1][1];
	    pDove = Points[Points.length-1][0];
	    pHawk = Points[Points.length-1][1];
	    Points.pop();
	    T-=1;
	}
}

function K16(){
	Zoom = 1;
    dragX = 0;
    dragY = 0;	
}

function K32(){
	nextTimestep();
	T+=1;
}

function K38(){
	if (Zoom>2*ZSpeed){
		Zoom -= ZSpeed;
	}
}

function K40(){
	Zoom += ZSpeed;
}

function K73(){
	alert('Hawk-Dove Game Simulation: instructions\n\n - Press \'I\' key to re-open this dialogue \n\n - P: Pause animation\n - R: Reset animation\n - S: Advance to next scene\n - X: Define initial num of Hawks/Doves\n - SPACE: Advance 1 timestep\n - BACKSPACE: Move back 1 timestep\n - SHIFT: Reset position/zoom level of graph\n - UP: Zoom in\n - DOWN: Zoom out\n - DRAG: Reposition axes\n')
}

function K80(){
	if (PLAY){
        PLAY=false;
    } else {
        PLAY=true;
    }	
}

function K82(){
	T=1;
	D = initDH[0];
	H = initDH[1];
	avD = D;
	avH = H;
	pDove = D;
	pHawk = H;
	Points = [[D,H]];
	doves = [];
	hawks = [];
	for (var i=0; i<D; i+=1){
	    doves.push([random(0,width),random(0,height)]);    
	}
	for (var i=0; i<H; i+=1){
	    hawks.push([random(0,width),random(0,height)]);
	}
}

function K83(){
	if (scene<3){
        scene += 1;    
    } else {
        scene = 1;
    }	
}

function K88(){
	if (scene===1){
	K82();
	PLAY = false;
	chooseStartPoint = true;
	} else {
		alert('You can only initialise the setup when on SCENE 1 (graph of Hawk / Dove)');
	}
}

function keyPressed(){
    switch (keyCode){
        case 8:  K8();  break;
        case 16: K16(); break;
        case 32: K32(); break;
        case 38: K38(); break;
        case 40: K40(); break;
        case 73: K73(); break;
        case 80: K80(); break;
        case 82: K82(); break;
        case 83: K83(); break;
        case 88: K88(); break;
    }
}

function mouseDragged(){
    dragX += (mouseX-pmouseX)/5;
    dragY -= (mouseY-pmouseY)/5;
}

function mouseClicked(){
	if (chooseStartPoint && scene === 1){
		if (floor(newMouseX)>=0 && floor(newMouseY)>=0 && floor(newMouseX)+floor(newMouseY)<=MAX){
			initDH = [floor(newMouseX),floor(newMouseY)];
			K82();
			chooseStartPoint = false;
		} else {
			chooseStartPoint = false;
		}
	}
}


window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  width = windowWidth;
  height = windowHeight
  originTranslation = [width/12,-11*height/12];
};


// Other functions down here