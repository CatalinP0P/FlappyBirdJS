var Bird = function()
{
    this.dead = false;
    this.x = 50;
    this.y = 350;
    this.width = 60;
    this.height = 50;
    this.gravity = 1;
    this.velocity = 0;
    this.lift = 20;
    this.frame = 1;
    this.image = document.getElementById("Bird1");

    setInterval(() => {
        this.frame++;
        if ( this.frame == 4 )
            this.frame = 1;
        this.image = document.getElementById("Bird" + this.frame);
    }, 100 );

    this.show = function()
    {   
        context.save(); 
        context.translate(this.x, this.y);
        context.rotate(this.velocity * Math.PI/180)
        context.translate(-this.x, -this.y);
        context.drawImage(this.image, this.x, this.y, this.width, this.height );

        context.restore();
    }

    this.update = function()
    {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if ( bird.y > canvas.height - this.height - groundImage.height )
        {
            this.y = canvas.height - this.height - groundImage.height;
            this.dead = true;
            clearInterval(gameLoop);
        }

        if ( bird.y < 0 )
        {
            this.dead = true;
            clearInterval(gameLoop);
        }
    }

    this.jump = function()
    {
        if ( this.velocity < 0 )
            this.velocity = 0;
        
        if ( this.velocity < this.lift / 2 )
            this.velocity -= this.lift / 1.5;
        else
            this.velocity -= this.lift;
    }

    this.checkForCollision = () =>
    {
        obstacleList.forEach(obstacle =>
        {
            if ( obstacle.x <= this.x + this.width && this.x <= obstacle.x + obstacle.width )
            {
                if ( bird.y < obstacle.gap - obstacle.spaceBetween || bird.y + bird.height > obstacle.gap + obstacle.spaceBetween )
                {
                    this.dead = true;
                }
                else if ( !obstacle.passed && bird.x == obstacle.x )
                {
                    obstacle.passed = true;
                    score++;
                    document.getElementById("scoreLabel").innerText = score;
                }
            }
            
        })
    }   
}


