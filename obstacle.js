var Obstacle = function()
{
    this.width = 100;
    this.height = this.width * 6;
    this.spaceBetween = 125;
    this.obstacleTopImage = document.getElementById("obstacleTop");
    this.obstacleBottomImage = document.getElementById("obstacleBottom");
    this.gap = Math.floor(Math.random() * (canvas.height - groundImage.height - 350) + 150 );
    this.x = canvas.width;
    this.speed = 3;
    this.passed = false;
    
    this.show = function()
    {
        if ( this.x < -this.width ) return;
        
        context.drawImage(this.obstacleTopImage, this.x, this.gap - this.height - this.spaceBetween, this.width, this.height);
        context.drawImage(this.obstacleBottomImage, this.x, this.gap + this.spaceBetween, this.width, this.height);    
    }
    
    this.move = () =>
    {
        this.x -= this.speed        
    }
}
