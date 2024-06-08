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
        this.element.style.backgroundColor = this.getRandomColor();//Setting the random color for each ball
        this.element.style.borderRadius = '50%';
        this.x = Math.random() * (this.container.clientWidth - this.radius * 2);        // Ensure that the balls never go outside the container
        this.y = Math.random() * (this.container.clientHeight - this.radius * 2);     // Ensure that the balls never go outside the container
        this.element.style.position = 'absolute';
        this.container.appendChild(this.element);
    }

    //Function to set random color for each ball
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
        if (this.x + this.radius * 2 >= this.container.clientWidth || this.x <=0) {
            this.dx *= -1;
        }
        if (this.y + this.radius * 2 >= this.container.clientHeight || this.y <= 0) {
            this.dy *= -1;
        }

    }
}

// Create an array to hold all the balls
let balls = [];

// Creating the balls of random sizes
for (var i = 0; i <=800; i++) {
    let radius = Math.random() * 10 + 10; // Generating a ball having radius between 10 and 20
    let dx = (Math.random() - 0.5) * 8; // Giving random speed between -4 to 4 for each ball in x direction  
    let dy = (Math.random() - 0.5) * 8; // Giving random speed between -4 to 4 for each ball in y direction
    let ball = new Ball(container, radius, dx, dy); // Calling the constructor for the ball class
    ball.createBall();
    balls.push(ball); // Add each ball to the array
}

function checkCollsionBetweenBalls(firstBall,secondBall){
    const distanceX=Math.abs((firstBall.x+firstBall.radius)-(secondBall.x+secondBall.radius)) //Getting the base value of right angled triangle
    const distanceY=Math.abs((firstBall.y+firstBall.radius)-(secondBall.y+secondBall.radius)) // Getting the perpendicular value of right angled triangle
    const hypotenuse=Math.sqrt(distanceX*distanceX+distanceY*distanceY) //Use pythagorean theorem
    return hypotenuse<=firstBall.radius+secondBall.radius //Checking for collision
}

// Function to animate the balls
function animate() {


    //First calculate the new ball position and check for the collision with the boundary
    for (let i = 0; i < balls.length; i++) {
        balls[i].moveTheBall();
    }


    // Secondly check if there is collision between two balls within the balls array
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
              if (checkCollsionBetweenBalls(balls[i], balls[j])) {
                 //Handle the collision between the balls
        }
    }
}

    //Finally set the ball to the new position based on the newly calculated position
    for (let i = 0; i < balls.length; i++) {
        balls[i].setPositionForBall();
    }


    // Call the animate function continously  
    requestAnimationFrame(animate);
}

// Start the animation
animate();

console.log(balls);
