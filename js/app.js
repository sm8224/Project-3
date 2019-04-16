// Enemies our player must avoid
let characters = ['images/char-boy.png', 'images/char-pink-girl.png'];
let count = 0;

class Enemy {
    constructor(x, y, s){
        this.x = x;
        this.y = y;
        this.speed = s;
     // The image/sprite for our enemies, this uses
     // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
     }
     // Draw the enemy on the screen, required method for game
    render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
        let xLoc = this.x;
        let yLoc = this.y;
        player.collision(xLoc, yLoc);
        // console.log(xLoc);
        // console.log(yLoc);
        if (this.x > 505) {
            this.x = -100;
            let randomSpeed = Math.floor(Math.random() * 400 + 50);//the + 50 here, keeps a minimum speed of at least 50 going for the enemies
            this.speed = randomSpeed;
        }
    }
    
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {    
    constructor() {
        // this.sprite = 'images/char-boy.png';
        this.sprite = characters[Math.floor(Math.random() * (characters.length))]; //randomly chooses a player image
        this.x = 200; //horizontal location
        this.y = 404; //vertical location

        //This code remvoes the div if it exists, which shows the number of times
        //you safely made it to the river
        count = 0;
        let removeDiv = document.getElementsByTagName('div');
        if (removeDiv.length > 0) {
            document.getElementsByTagName('div')[0].remove();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset() {        
        score();     
        this.x = 200;
        this.y = 404;
    }

    handleInput(input) {
        if (input == 'left' && this.x > 0) {
            this.x -= 101;
        }

        if (input == 'right' && this.x < 402) {
            this.x += 101;
        }

        if (input == 'up' && this.y > 0) {
            this.y -= 83;
            if (this.y == -11){
                console.log(this.y);
                this.reset();
            }
        }

        if (input == 'down' && this.y < 404) {
            this.y += 83;
        }
    }

    // collision detection happens here.   xLoc and yLoc are passed in from the Enemy class
    // we then subtract the xLoc(enemy) from this.x (player location).   from there, i check to see if 
    // this value is between -40 and + 40 in order to create a detection boundary arond the enemy for the 
    // x-axis (horizontal).   this same thougth process is then repeated for the y-axis (vertical) except
    // i create a boundary of -20 through +20.
    collision(xLoc, yLoc) {
        if ((this.x - xLoc) >= -40 && (this.x - xLoc) <= 40 && (this.y - yLoc) >= -20 && (this.y - yLoc) <= 20) {
            player = new Player();
        }
    }
};

// keeps a score of how many times you successfully make it to the river
// and adds this to the screen by appending a new Div to the body of the HTML
let newDiv = document.createElement('div');
function score () {
    count += 1;
    console.log(count);
    console.log(`You made it ${count} times`);
    document.getElementsByTagName('body')[0].appendChild(newDiv);
    document.getElementsByTagName('div')[0].innerHTML = `You made it ${count} times`;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let enemy1 = new Enemy(-100, 65, 150);
let enemy2 = new Enemy(-100, 145, 50);
let enemy3 = new Enemy(-100, 225, 25);
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

player.handleInput(allowedKeys[e.keyCode]);
});
