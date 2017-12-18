let bubbles = [];
let GameState = "Title";
let score = 20;
let timer = 90;

function mousePressed()
{
	if(GameState == "Title")
	{
		GameState = "Gameplay";
	}

	else if(GameState == "Gameplay")
	{
		for(let i = 0; i < bubbles.length; i++)
		{
			if(dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y) < bubbles[i].r && bubbles[i].popped == false)
			{
				bubbles[i].popped = true;
				score += 5;
			}
		}
	}
	else if(GameState == "Win" || GameState == "Lose")
	{
		GameState = "Title";
	}
}
class Bubble
{
	constructor(x,y,r)
	{
		this.x = x;
		this.y = y;
		this.r = r;
		this.xMove = random(-5,5);
		this.popped = false;
	}

	move()
	{
		this.x += this.xMove;
		this.y += 5;
		if(this.y - this.r > height)
		{
			this.y = this.r * -1;
			this.xMove = random(-5,5);
			if(this.popped == false)
			{
				score--;
			}
			this.popped = false;

		}

		if(this.x >= width + (this.r))
		{
			this.x = -1 * this.r;
		}
		else if(this.x <= (this.r) * -1)
		{
			this.x = width + this.r;
		}
	}
	show()
	{
		if(this.popped == false)
		{
			stroke(255);
			strokeWeight(4);
			noFill();
			ellipse(this.x, this.y, this.r * 2, this.r * 2);
		}
	}
}
function TitleScreen()
{
	background(0);
	fill("White");
	textSize(40);
	text("Pop the Bubbles! Don't let your score drop below 0!", (width/4), (height/2) - 50);
	text("Click anywhere to play!", (width/2) - 350, (height/2) + 50)
}
function Gameplay()
{
	background(0);
	fill("White");
	textSize(20);
	text("Score: " + score, 25, 25);
	text("Time left: " + timer, width - 150, 25);
	for(let i = 0; i < bubbles.length; i++)
	{
		bubbles[i].move();
		bubbles[i].show();
	}
	if(timer <= 0)
	{
		GameState = "Win";
	}
	else if (score <= 0)
	{
		GameState = "Lose";
	}
}
function winScreen()
{
	background("Green");
	fill("White");
	textSize(40);
	text("Congratulations! You won the game!", (width/4), (height/2) - 50);
	text("Click to be taken back to the title screen!", (width/4), (height/2) + 50)
}
function loseScreen()
{
	background("Red");
	fill("White");
	textSize(40);
	text("Ouch, looks like you lost the game!", (width/4), (height/2) - 50);
	text("Click to be taken back to the title screen!", (width/4), (height/2) + 50)
}

function timerTick()
{
	timer--;
}

function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(windowWidth - 20, windowHeight - 20);
	for(let i = 0; i < 20; i++)
	{
		bubbles[i] = new Bubble(random(0,windowWidth), random(0,windowHeight), random(25,50));
	}
	setInterval(timerTick, 1000);
}

function draw() { // built-in P5.JS function -=-  automatic loop that repeats forever
	background(0); // give the canvas a black background
	if(GameState == "Title")
	{
		TitleScreen();
		timer = 90;
		score = 20;
	}

	else if(GameState == "Gameplay")
	{
		Gameplay();
	}
	else if(GameState == "Win")
	{
		winScreen();
	}
	else if(GameState == "Lose")
	{
		loseScreen();
	}
}