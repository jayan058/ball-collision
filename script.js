let container = document.getElementById('ball-contanier');

class Ball {
    // Constructor for property initialization for each ball
    constructor(container, radius, dx, dy) {
        this.container = container;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    // Function to create each ball
    createBall() {
        this.element = document.createElement('div');
        this.element.className = 'individual-ball';
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.backgroundColor = 'black';
        this.element.style.borderRadius = '50%';
        this.x = Math.random() * (this.container.clientWidth - this.radius * 2);        // Ensure that the balls never go outside the container
        this.y = Math.random() * (this.container.clientHeight - this.radius * 2);     // Ensure that the balls never go outside the container
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.container.appendChild(this.element);
    }

    // Function to set position for each ball
    setPositionForBall() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    moveTheBall() {
        this.x += this.dx;
        this.y += this.dy;

        // Boundary collision detection and response
        if (this.x + this.radius * 2 > this.container.clientWidth || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y + this.radius * 2 > this.container.clientHeight || this.y < 0) {
            this.dy *= -1;
        }

    }
}

// Create an array to hold all the balls
let balls = [];

// Creating the balls of random sizes
for (var i = 0; i <= 700; i++) {
    let radius = Math.random() * 10 + 10; // Generating a ball having radius between 10 and 20
    let dx = (Math.random() - 0.5) * 8; // Giving random speed between -4 to 4 for each ball in x direction  
    let dy = (Math.random() - 0.5) * 8; // Giving random speed between -4 to 4 for each ball in y direction
    let ball = new Ball(container, radius, dx, dy); // Calling the constructor for the ball class
    ball.createBall();
    balls.push(ball); // Add each ball to the array
}

// Function to animate the balls
function animate() {
    //First calculate the new ball position and check for the collision with the boundary
    for (let i = 0; i < balls.length; i++) {
        balls[i].moveTheBall();
    }
    // Set the ball to the new position based on the newly calculated position
    for (let i = 0; i < balls.length; i++) {
        balls[i].setPositionForBall();
    }
    requestAnimationFrame(animate);
}

// Start the animation
animate();


