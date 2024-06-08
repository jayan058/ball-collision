let contanier=document.getElementById('ball-contanier')

class Ball{
    //Constructor for property initialization for each ball
    constructor(contanier,radius,dx,dy){
        this.contanier=contanier,
        this.radius=radius,
        this.dx=dx,
        this.dy=dy
        
    }

    //Function to create each ball
    createBall(){
        this.element=document.createElement('div')
        this.element.className='indivisual-ball'
        this.element.style.width=`${this.radius*2}px`
        this.element.style.height=`${this.radius*2}px`
        this.element.style.backgroundColor = 'black'
        this.element.style.borderRadius = '50%'; 
    }
    //Function to set position for each ball
    setPositionForBall(){
       this.x = Math.random() * (this.contanier.clientWidth - this.radius*2)// To ensure that the balls never go outside the contanier do *2
       this.y = Math.random() * (this.contanier.clientHeight - this.radius*2)// To ensure that the balls never go outside the contanier do *2 
       this.element.style.position = 'absolute';
       this.element.style.left = `${this.x}px`;
       this.element.style.top = `${this.y}px`;
       this.element.style.backgroundColor = 'black'
       this.contanier.appendChild(this.element)

    }


}



//Creating the balls of random sizes 

for(var i=0;i<=400;i++){
   let radius=Math.random()*10+10//Generating a ball having radius between 10   and 20
   let dx = (Math.random() - 0.5) * 8; //Giving random speed between -4 to 4 for each ball in x direction  
   let dy = (Math.random() - 0.5) * 8; //Giving random speed between -4 to 4 for each ball in x direction
   let ball=new Ball(contanier,radius,dx,dy)//Calling the constructor for the ball class
   ball.createBall()
   ball.setPositionForBall()
}