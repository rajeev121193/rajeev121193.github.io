var level = lvl1;

var blockSize = 16;
var heroSize = 15;
var h = level.length * blockSize;
var w = level[0].length * blockSize;
var f = 0.3;
var g = 0.15;

var vx = 1;
var vy = -5;

var num_spins = 5;
var maxAcc = f * 3;