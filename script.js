'use strict'
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let timerId = setInterval(addFigure, 5000);
setInterval("drawFrame()", 20);
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
let counterBall = 0;
let counterRec = 0;
let figures = [];
addFigure();

function Figure(x, y, dx, dy, radius, randomNumber, randomizeForColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.randomNumber = randomNumber;
    this.randomizeForColor = randomizeForColor;
}

function addFigure() {
    let size = Math.floor(Math.random() * 80);
    if (size < 20)
        size += 20;
    let randomNumberForAddFigure = randomizeForAddFigure();
    let figure = new Figure(0 + size, 0 + size, 1, 1, size, randomNumberForAddFigure, randomizeForColor());
    figures.push(figure);
    calculateArea(size, randomNumberForAddFigure)
    drawFrame();
}

function calculateArea(size, randomNumberForAddFigure) {
    let area = 0;
    if (randomNumberForAddFigure >= 5) {
        area = size * size * Math.PI;
    } else {
        area = size * size;
    }
    console.log("Area of figure is " + area + "px");
}

function randomizeForAddFigure() {
    let random = Math.floor(Math.random() * 10);
    if (random >= 5)
        counterBall += 1;
    else
        counterRec += 1;
    if (counterBall > 10) {
        random = 1;
        counterRec += 1;
    }
    if (counterRec > 10) {
        random = 6;
        counterBall += 1;
    }
    if (counterBall >= 10 && counterRec >= 10) {
        clearInterval(timerId);
    }
    return random;
}

function randomizeForColor() {
    let randomColor = Math.floor(Math.random() * 10);
    let color;
    switch (randomColor) {
        case 0:
            return color = context.fillStyle = "orange";
        case 1:
            return color = context.fillStyle = "red";
        case 2:
            return color = context.fillStyle = "blue";
        case 3:
            return color = context.fillStyle = "green";
        case 4:
            return color = context.fillStyle = "wheat";
        case 5:
            return color = context.fillStyle = "lightseagreen";
        case 6:
            return color = context.fillStyle = "darkslategray";
        case 7:
            return color = context.fillStyle = "navy";
        case 8:
            return color = context.fillStyle = "indigo";
        default:
            return color = context.fillStyle = "black";
    }
}

function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    for (let i = 0; i < figures.length; i++) {
        let figure = figures[i];
        figure.x += figure.dx;
        figure.y += figure.dy;

        if ((figure.x + figure.radius > canvas.width) || (figure.x - figure.radius < 0)) {
            figure.dx = -figure.dx;
            if (Math.floor(Math.random() * 10) < 5)
                figure.dy = -figure.dy;
        }

        if ((figure.y + figure.radius > canvas.height) || (figure.y - figure.radius < 0)) {
            figure.dy = -figure.dy;
        }

//неудачная попытка сделать отскок шариков при пересечении
        /*  for (let a = 0; a < figures.length; a++) {
             if (figure === figures[a]) continue;
              else {
              let distance = figure.dx + figure.dy - figures[a].dx + figures[a].dy;
                  if (distance < figure.radius + figures[a].radius) {
                      figures[a].dx = -figures[a].dx;
                      figures[a].dy = -figures[a].dy;
                      figure.dx = -figure.dx;
                      figure.dy = -figure.dy;
              }
          }*/

        context.beginPath();
        if (figure.randomNumber >= 5) {
            context.fillStyle = figure.randomizeForColor;
            context.arc(figure.x, figure.y, figure.radius, 0, Math.PI * 2);
        } else {
            context.fillStyle = figure.randomizeForColor;
            context.fillRect(figure.x, figure.y, figure.radius, figure.radius);
        }
        context.fill();
    }
}









