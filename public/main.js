const squares = document.querySelectorAll('.square');

squares.forEach((square) => {
	square.addEventListener('click', SquareClick, { once: true });
});

var Turn = '.X';

function SquareClick(e) {
	if (CheckForDraw() == false && CheckForWin('.O') == false && CheckForWin('.X') == false) {
		this.querySelector(Turn).style.height = '100px';
		this.querySelector(Turn).style.display = 'block';
		this.querySelector(Turn).querySelectorAll('path')[0].style.strokeDashoffset = 0;
		setTimeout(
			function (x) {
				if (x != undefined) x.style.strokeDashoffset = 0;
			},
			250,
			this.querySelector(Turn).querySelectorAll('path')[1]
		);
		if (CheckForWin(Turn)) Win(Turn);
		else if (CheckForDraw()) Draw();
		if (Turn == '.X') Turn = '.O';
		else Turn = '.X';
	}
}

var PossibleWins = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

var path = "";

function CheckForWin(Turn) {
	return PossibleWins.some((possibility) => {
		return possibility.every((index) => {
			path = possibility;
			return squares[index - 1].querySelector(Turn).style.display == 'block';
		});
	});
}

function CheckForDraw() {
	return document.querySelectorAll("[style =  'height: 100px; display: block;']").length == 9;
}

function Draw() {
	document.querySelector('.EndScreen').style.display = 'block';
	document.querySelector('.EndText').innerText = 'Draw!';
}

function Win(x) {
	document.querySelector('.EndScreen').style.display = 'block';
	if (x == '.X') document.querySelector('.EndText').innerText = 'X is a winner!';
	else document.querySelector('.EndText').innerText = 'O is a winner!';
	document.querySelector('.EndLine').style.height = '300px';
	document.querySelector('.EndLine').firstChild.style.strokeDashoffset = 0;
	Path();
}

function restart() {
	location.reload();
}

function Path() {
	var startx = ((path[0] - 1) % 3) * 100 + 50;
	var starty = 100 * Math.round((path[0] - 1) / 3 - 0.5) + 50;
	var start = 'M' + startx.toString() + ',' + starty.toString();
	var endx = ((path[2] - 1) % 3) * 100 + 50;
	var endy = 100 * Math.round((path[2] - 1) / 3 - 0.5) + 50;
	var end = ' L' + endx.toString() + ',' + endy.toString();
	var line = start + end;
	document.querySelector('.EndLinePath').setAttribute('d', line);
}
