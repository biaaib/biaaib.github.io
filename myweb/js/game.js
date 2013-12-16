var timer;
var color;
var nextcolor;
var activeBlock = new Array(4);
var nextBlock = new Array(4);
var grid = new Array(16);
for (var i = 0; i < 16; i++) {
	grid[i] = new Array(10);
}
for (var i = 0; i < 16; i++) {
	for (var j = 0; j < 10; j++) {
		grid[i][j] = 0;

	}
}
function generateColor() {
	var tcolor;
	var tc = (Math.floor(Math.random() * 10) + 1) % 6;
	switch (tc) {
		case 0:
			tcolor = "LightPink";
			break;
		case 1:
			tcolor = "CornflowerBlue";
			break;
		case 2:
			tcolor = "YellowGreen";
			break;
		case 3:
			tcolor = "lightblue";
			break;
		case 4:
			tcolor = "SandyBrown";
			break;
		case 5:
			tcolor = "Plum";
			break;
	}
	return tcolor;
}
function generateBlock() {
	var block = new Array(4);
	var t = (Math.floor(Math.random() * 10) + 1) % 7;
	switch (t) {
		case 0:
			block[0] = { x: 0, y: 4, j: -1 };
			block[1] = { x: 1, y: 4, j: -1 };
			block[2] = { x: 1, y: 5, j: -1 };
			block[3] = { x: 1, y: 6, j: -1 };
			break;
		case 1:
			block[0] = { x: 0, y: 3, j: 0 };
			block[1] = { x: 0, y: 4, j: 0 };
			block[2] = { x: 0, y: 5, j: 0 };
			block[3] = { x: 0, y: 6, j: 0 };
			break;
		case 2:
			block[0] = { x: 0, y: 4, j: 0 };
			block[1] = { x: 1, y: 4, j: 0 };
			block[2] = { x: 1, y: 5, j: 0 };
			block[3] = { x: 2, y: 5, j: 0 };
			break;
		case 3:
			block[0] = { x: 0, y: 5, j: 0 };
			block[1] = { x: 1, y: 5, j: 0 };
			block[2] = { x: 1, y: 4, j: 0 };
			block[3] = { x: 2, y: 4, j: 0 };
			break;
		case 4:
			block[0] = { x: 0, y: 4, j: -1 };
			block[1] = { x: 1, y: 4, j: -1 };
			block[2] = { x: 2, y: 4, j: -1 };
			block[3] = { x: 2, y: 5, j: -1 };
			break;
		case 5:
			block[0] = { x: 0, y: 4, j: 2 };
			block[1] = { x: 0, y: 5, j: 2 };
			block[2] = { x: 1, y: 4, j: 2 };
			block[3] = { x: 1, y: 5, j: 2 };
			break;
		case 6:
			block[0] = { x: 0, y: 5, j: -1 };
			block[1] = { x: 1, y: 4, j: -1 };
			block[2] = { x: 1, y: 5, j: -1 };
			block[3] = { x: 1, y: 6, j: -1 };
			break;
	}
	
	return block;
}
function moveLeft() {
	if (!touchLeft(activeBlock)) {
		eraseBlock(activeBlock);
		for (var i = 0; i < 4; i++) {
			activeBlock[i].y -= 1;
		}
		paintBlock(activeBlock);
	}
}
function moveRight() {
	if (!touchRight(activeBlock)) {
		eraseBlock(activeBlock);
		for (var i = 0; i < 4; i++) {
			activeBlock[i].y += 1;
		}
		paintBlock(activeBlock);
	}
}
function turn() {
	var temBlock = new Array(4);
	var ax = 0, ay = 0;
	for (var i = 0; i < 4; i++) {
		temBlock[i] = { x: activeBlock[i].x, y: activeBlock[i].y,j:activeBlock[i].j };
	}
	for (var i = 0; i < 4; i++) {
		ax += temBlock[i].x;
		ay += temBlock[i].y;
	}
	ax = Math.round(ax /= 4);
	ay = Math.round(ay /= 4);
	for (var i = 0; i < 4; i++) {
		var x, y;
		x = ax + (temBlock[i].y - ay);
		y = ay - (temBlock[i].x - ax);
		temBlock[i].x = x;
		temBlock[i].y = y;
	}
	if (!touchOther(temBlock)) {
		eraseBlock(activeBlock);
		activeBlock = temBlock;
		for (var i = 0; i < 4; i++) {
		   // alert(activeBlock[i].j);
			if (activeBlock[i].j == 0) {
				activeBlock[i].j = 1;
			}
			else if (activeBlock[i].j == 1) {
				activeBlock[i].j = 0;
				activeBlock[i].y--;
			}
			else if (activeBlock[i].j == 2) {
				activeBlock[i].y--;
			}
		}
		paintBlock(activeBlock);
	}
}
function moveDown() {
	if (!touchBottom(activeBlock)) {
		eraseBlock(activeBlock);
		for (var i = 0; i < 4; i++) {
			activeBlock[i].x += 1;
		}
		paintBlock(activeBlock);
	}
	else {
		paintGrid();
		checkCutline();
		paintBoard();
		timer = window.clearInterval(timer);
		activeBlock = nextBlock;
		color = nextcolor;
		eraseTSBlock(nextBlock);
		nextBlock = generateBlock();
		nextcolor = generateColor();
		paintTSBlock(nextBlock);
		timer = setInterval("moveDown()", 500);
	}
}
function paintGrid() {
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 10; j++) {
			if ($("#board tr:eq(" + i + ") td:eq(" + j + ")").css("background-color") != "rgba(0, 0, 0, 0)") {
				grid[i][j] = 1;
			}
		}
	}
}
function paintBoard() {
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 10; j++) {
			if (grid[i][j] && $("#board tr:eq(" + i + ") td:eq(" + j + ")").css("background-color") == "rgba(0, 0, 0, 0)") {
				$("#board tr:eq(" + i + ") td:eq(" + j + ")").css("background-color", color);
			}
		}
	}
 }
 function eraseBlock(ab) {
	for (var i = 0; i < 4; i++) {
		$("#board tr:eq(" + ab[i].x + ") td:eq(" + ab[i].y + ")").css("background-color", "rgba(0, 0, 0, 0)");
	}
 }
 function paintBlock(ab) {
		for (var i = 0; i < 4; i++) {
			$("#board tr:eq(" + ab[i].x + ") td:eq(" + ab[i].y + ")").css("background-color", color);           
	 }
}
function eraseTSBlock(ab) {
	for (var i = 0; i < 4; i++) {
		$("#panel tr:eq(" + (ab[i].x+1) + ") td:eq(" + (ab[i].y-3) + ")").css("background-color", "rgba(0, 0, 0, 0)");
	}
}
function paintTSBlock(ab) {
	 for (var i = 0; i < 4; i++) {
		 $("#panel tr:eq(" + (ab[i].x+1) + ") td:eq(" + (ab[i].y-3) + ")").css("background-color", nextcolor); 
	 }
 }
 function checkCutline() {
	 var line = 0;
	 var score = parseInt($("#score").text());
	// alert("score" + score);
	 for (var i = 0; i < 16; i++) {
		 var j = 0;
		 for (; j < 10; j++) {
			 if (!grid[i][j]) {
				 break;
			 }
		 }
		 if (j == 10) {
			 line++;
			 for (var k = i - 1; k >= 0; k--) {
				 for (var t = 0; t < 10; t++) {
					 grid[k + 1][t] = grid[k][t];
					 $("#board tr:eq(" + (k+ 1) + ") td:eq(" + t + ")").css("background-color",$("#board tr:eq(" + k + ") td:eq(" + t + ")").css("background-color"));
				 }
			 }
			 generateNewline();
			 j = 0;
		 }
	 }
	 if (line != 0) {
		 score = score + Math.pow(10, line);
		 //alert(score);
		 $("#score").text(score);
		 line = 0;
	 }
 }
 function generateNewline() {         //减行时集体向下移之后，第一行将是新的一行
	 for (var i = 0; i < 10; i++) {
		 grid[0][i] = 0;
	 }
 }
 function touchBottom(ab) {
	 var flag=0;
	 for (var i = 0; i < 4; i++) {
		 if (ab[i].x == 0) {
			 flag = 1;
		 }
		 if (grid[ab[i].x][ab[i].y] == 1&&flag==1) {
			 alert("GAME OVER");
			 //alert("stop")
			 flag = 2;
			 break;
		 }
	 }
	 if (flag == 2) {
		 window.location.reload();
	 }
	 for (var i = 0; i < 4; i++) {
		 if (ab[i].x >= 15 || (grid[ab[i].x+1][ab[i].y]==1&&$("#board tr:eq(" + (ab[i].x + 1) + ") td:eq(" + ab[i].y + ")").css("background-color") != "rgba(0, 0, 0, 0)")) {
			 return true;
		 }
	 }
		 return false;
	 }
 function touchLeft(ab) {
	 for (var i = 0; i < 4; i++) {
		 if (ab[i].y <= 0 || (grid[ab[i].x][ab[i].y-1]==1&&$("#board tr:eq(" + ab[i].x  + ") td:eq(" + (ab[i].y - 1) + ")").css("background-color") != "rgba(0, 0, 0, 0)")) {
			 return true;
		 }
	 }
	 return false;
 }
 function touchRight(ab) {
	for (var i = 0; i < 4; i++) {
		 if (ab[i].y >= 9 || (grid[ab[i].x][ab[i].y+1]==1&&$("#board tr:eq(" + ab[i].x + ") td:eq(" + (ab[i].y + 1) + ")").css("background-color") != "rgba(0, 0, 0, 0)")) {
			 return true;
		 }
	}
	return false;
}
function touchOther(ab) {
	for (var i = 0; i < 4; i++) {
		if (ab[i].x>15||ab[i].y<=0||ab[i].y>9||(grid[ab[i].x][ab[i].y] == 1 && $("#board tr:eq(" + ab[i].x + ") td:eq(" + ab[i].y + ")").css("background-color") != "rgba(0, 0, 0, 0)")) {
			return true;
		}
	}
	return false;
}

//开始
function start(e) {
	e.disabled = true;
	activeBlock = generateBlock();      //当前格子
	nextBlock = generateBlock();        //提示框中的格子类型
	color = generateColor();            //当前随机颜色
	nextcolor = generateColor();        //提示框中的格子颜色
	paintBlock(activeBlock);			
	paintTSBlock(nextBlock);
	timer = setInterval("moveDown()", 500);
}
$(document).keydown(function (event) {
	var e = event;
	var k = e.keyCode;
	switch (k) {
		case 37:
			moveLeft();
			break;
		case 39:
			moveRight();
			break;
		case 40:
			moveDown();
			break;
		case 38:
			turn();
			break;
		case 90:
			alert("暂停");
			break;
	}
	return false;
}) 
