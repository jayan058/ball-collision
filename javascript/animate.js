import balls from './createball.js';
function animate() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].moveTheBall();
    }

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
            const otherBall = balls[j];
            const dx = otherBall.x - ball.x;
            const dy = otherBall.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= ball.radius + otherBall.radius) {
                ball.element.style.backgroundColor = ball.getRandomColor();
                otherBall.element.style.backgroundColor = ball.getRandomColor();
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);
              //Shifting the ball by 'angle' angle so that 1-D coliision formula can be applied
                const vx1 = ball.dx * cos - ball.dy * sin;
                const vy1 = ball.dy * cos + ball.dx * sin;
                const vx2 = otherBall.dx * cos - otherBall.dy * sin;
                const vy2 = otherBall.dy * cos + otherBall.dx * sin;
             //Calculating the final velocty after collision in 1-D for the elastic collision between the balls 
                const vx1Final = ((ball.mass - otherBall.mass) * vx1 + 2 * otherBall.mass * vx2) / (ball.mass + otherBall.mass);
                const vx2Final = (((otherBall.mass - ball.mass) * vx2) + 2 * ball.mass * vx1) / (ball.mass + otherBall.mass);
             //Shifting the balls back to the original angle
                ball.dx = vx1Final * cos + vy1 * sin;
                ball.dy = vy1 * cos - vx1Final * sin;
                otherBall.dx = vx2Final * cos + vy2 * sin;
                otherBall.dy = vy2 * cos - vx2Final * sin;
             //To prevent the balls from sticking with each other after collision
                const overlap = ball.radius + otherBall.radius - distance;
                const separationX = overlap * cos;
                const separationY = overlap * sin;
             //Each ball moves by half of seperation distance hence when both balls move by half distance they are seperated by a total of 'seperationX ' and 'seperationY' distance   
                ball.x -= separationX / 2;
                ball.y -= separationY / 2;
                otherBall.x += separationX / 2;
                otherBall.y += separationY / 2;
            }
        }
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].setPositionForBall();
    }

    requestAnimationFrame(animate);
}

export default animate;
