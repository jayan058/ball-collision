
export default class Ball {
    //Initializing the ball
    constructor(container, radius, dx, dy) {
        this.container = container;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.mass = radius; // assumed mass proportional to radius for simplicity
    }
    //Creation of the ball

    createBall() {
        this.element = document.createElement('div');
        this.element.className = 'individual-ball';
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.backgroundColor = this.getRandomColor();
        this.element.style.borderRadius = '50%';
        this.x = Math.random() * (this.container.clientWidth - this.radius * 2);
        this.y = Math.random() * (this.container.clientHeight - this.radius * 2);
        this.element.style.position = 'absolute';
        this.container.appendChild(this.element);
    }
    //Generate each ball of random color

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    //Set the position for the ball

    setPositionForBall() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    moveTheBall() {
        
        //Moving the ball
        this.x += this.dx;
        this.y += this.dy;
        
        
        
        //Checking for collison with the container
        if (this.x + this.radius * 2 >= this.container.clientWidth) {
            this.x = this.x - this.radius / 2;
            this.dx *= -1;
        } else if (this.x <= 0) {
            this.x = this.x + this.radius / 2;
            this.dx *= -1;
        } else if (this.y + this.radius * 2 >= this.container.clientHeight) {
            this.y = this.y - this.radius / 2;
            this.dy *= -1;
        } else if (this.y <= 0) {
            this.y = this.y + this.radius / 2;
            this.dy *= -1;
        }
    }
}
