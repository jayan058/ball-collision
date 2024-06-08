let container = document.getElementById('ball-contanier');

class Ball {
    // Constructor for property initialization for each ball
    constructor(container, radius, dx, dy) {
        this.container = container;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.mass=radius //assumed mass proportinal to radius for simplicity
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
        if (this.x + this.radius * 2 >= this.container.clientWidth) {
            this.x=this.x-this.radius/2 // to prevent the ball from sticking in the boundary
            this.dx *= -1; // Reverse direction
          
        }
        else if(this.x <= 0){
            this.x=this.x+this.radius/2 // to prevent the ball from sticking in the boundary
            this.dx *= -1; // Reverse direction
            
        }

        else if (this.y + this.radius * 2 >= this.container.clientHeight) {
            this.y=this.y-this.radius/2 // to prevent the ball from sticking in the boundary
            this.dy *= -1; // Reverse direction
           
        }
        else if(this.y <= 0){
            this.y=this.y+this.radius/2 // to prevent the ball from sticking in the boundary
            this.dy *= -1; // Reverse direction
        }
    }
    
}

// Create an array to hold all the balls
let balls = [];

// Creating the balls of random sizes
for (var i = 0; i <=500; i++) {
    let radius = Math.random() * 6 + 10; // Generating a ball having radius between 10 and 15
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


    // Secondly check if there is collision between two balls within the balls array
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
            const otherBall = balls[j];
            const dx = otherBall.x - ball.x;
            const dy = otherBall.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy); //pythagoreas theorem
            
            if (distance <= ball.radius + otherBall.radius) {
                
                // Collision detected now handle it
                const angle = Math.atan2(dy, dx); // finding the angle of the point of collision with respect to positive x-axis 
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);
    
                // Rotate velocities anticlockwise by angle to make it 1-dimensional collision so that the one dimensional final velocity formula can be applied 
                const vx1 = ball.dx * cos - ball.dy * sin;
                const vy1 = ball.dy * cos + ball.dx * sin;
                const vx2 = otherBall.dx * cos - otherBall.dy * sin;
                const vy2 = otherBall.dy * cos + otherBall.dx * sin;
    
                // Calculate the final velocity along the X-axis from the equation of final velocity of elastic collision
                const vx1Final = ((ball.mass - otherBall.mass) * vx1 + 2 * otherBall.mass * vx2) / (ball.mass + otherBall.mass);
                const vx2Final = (((otherBall.mass - ball.mass) * vx2) + 2 * ball.mass * vx1) / (ball.mass + otherBall.mass);
    
                // Rotate velocities back to the original position to make it 2-dimensional in clockwise direction by using the rotation equation
                ball.dx = vx1Final * cos + vy1 * sin;
                ball.dy = vy1 * cos - vx1Final * sin;
                otherBall.dx = vx2Final * cos + vy2 * sin;
                otherBall.dy = vy2 * cos - vx2Final * sin;
    
                // Separate balls to prevent sticking
                    const overlap = ball.radius + otherBall.radius - distance;
                    const separationX = overlap * cos //resolving overlap along x-axis
                    const separationY = overlap * sin //resolving overlap along y-aixs
                    
                    //Here each ball's x and y position are subtracted by half hence both the balls move apart form each other by a distance which total's to seperarion 
                    ball.x -= separationX/2; 
                    ball.y -= separationY/2;
                    otherBall.x += separationX/2;
                    otherBall.y += separationY/2;
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
