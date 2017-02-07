//Game
var w = 300;
var h = 400;
var defaultFrameRate = 60;

//Snake
var defaultVel = 10;
var snakeSize = 10;
var snakeColor = {
	R: 250, G: 143, B: 88
};
var tailHeadColor = {
	R: 255, G: 127, B:80
};
var tailEndColor = {
	R: 244, G: 164, B:96
};
var tailColorWithFood = {
	R: 233, G: 100, B: 70
};

//Food
var foodSize = snakeSize;
var foodColor = {
	R: 0, G: 255, B: 120
};

//Special Food
var specialFoodColor = {
	R: 255, G: 212, B: 70
};
var specialFoodInterval = 5;
var specialFoodLifeSpan = 7;