import Ball from './ball.js';
import { MIN_RADIUS, MAX_RADIUS, DX_RANGE, DY_RANGE } from './constant.js';

let container = document.getElementById('ball-contanier');
let balls = [];

for (let i = 0; i <= 800; i++) {
    let radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    let dx = (Math.random() - 0.5) * DX_RANGE;
    let dy = (Math.random() - 0.5) * DY_RANGE;
    let ball = new Ball(container, radius, dx, dy);
    ball.createBall();
    balls.push(ball);
}

export default balls;

