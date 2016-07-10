document.getElementById("runGame").addEventListener("click", beginGame);

				var c = document.getElementById("canvas");
				//calling the <canvas>
				var ctx = c.getContext("2d");
				//allow drawing on <canvas>
				
				var x = canvas.width/2;
				var y = canvas.height-30;
				//these are the starting coordinates of the ball. half the width of the screen and 30px from the bottom
				
				var dx;
				switch (Math.floor((Math.random() * 10) + 1)){
					case 1:
						dx = -5;
						break;
					case 2:
						dx = -4;
						break;
					case 3:
						dx = -3;
						break;
					case 4:
						dx = -2;
						break;
					case 5:
						dx = -1;
						break;
					case 6:
						dx = 1;
						break;
					case 7:
						dx = 2;
						break;
					case 8:
						dx = 3;
						break;
					case 9:
						dx = 4;
						break;
					case 10:
						dx = 5;
				}
				//this switch function makes it so that the ball will launch in a random direction upon every new instance of the game
				
				var dy = -5;
				//these variables will add a small value to x and y every frame to make it appear like the ball is moving
				
				var ballRadius = 10;
				//this defines the edges of the ball (should be equal to the radius of the ball drawn)
				
				var paddleHeight = 10;
				var paddleWidth = 75;
				//I am defining the size of the paddle which the user controls
				var paddleX = (canvas.width-paddleWidth)/2;
				//this is the starting point of the paddle on the scree. (half way through the x axis)
				
				var rightPressed = false;
				var leftPressed = false;
				//these variables are for the user's key inputs
				//default value is false because we do not want any movement to begin with
			
				var brickRowCount = 1;
/*				var i;
				i = document.getElementById("userInputRow").value;
				trying to figure out how I can let the user control the amount of rows that appear whether it be a slider or inputting the number but it will not update the game */
				var brickColumnCount = 5;
				var brickWidth = 75;
				var brickHeight = 20;
				var brickPadding = 10;
				var brickOffsetTop = 30;
				var brickOffsetLeft = 30;
				//all of the above is used to define the bricks
				//it indicates the #rows/columns, width/height, padding so they don't touch each other, and offset so they do not draw at the very edges of the canvas
				var rowColors = ["#00FFFF", "#F5A9F2", "#F7FE2E", "#FE2E2E", "#C8FE2E"];
				//color of the rows (up to 5)
				var bricks = [];
				//we are defining the bricks in a 2-D array
				//it will contain the columns (c), containing the rows (r), with each containing an object containing the x and y position for each brick on the screen
				
					for (c = 0; c < brickColumnCount; c++) {
						bricks[c] = [];
						
						for (r = 0; r < brickColumnCount; r++) {
							bricks[c][r] = {x: 0, y: 0, status: 1};
						//the status: 1 property will indicate whether the brick will be on screen or not in the drawBrick function
						}
					}
					//this code will loop creating new bricks when the column and row are 0, creating the new bricks starting at coordinate (0,0)
				
				var hiScore = 0;
				
				var score = 0;
				
				var lives = 3;
				
			document.addEventListener("keydown", keyDownHandler, false);
			document.addEventListener("keyup", keyUpHandler, false);
			//when the keys on the keyboard are pressed the keyDownHandler becomes active. same for the keyDownHandler
			//these events are predefined in JS but the functions will be made below
			
		//FUNCTIONS
			
			function keyDownHandler(e) {
			//the (e) indicates that the function will occur as an event or when the user inputs something
				if(e.keyCode == 39) {
					rightPressed = true;
				}
				
				else if(e.keyCode == 37) {
					leftPressed = true;
				}
				//the left and rightPressed are variables we defined earlier
				//the keycode 39 and 37 are predefined as the right and left cursor keys respectively
				//pressing a key will set the default value from false to true allowing for movement in that direction
			}
			
			function keyUpHandler(e) {
				
				if(e.keyCode == 39) {
					rightPressed = false;
				}
				
				else if(e.keyCode == 37){
					leftPressed = false;
				}
				//this if statement is when the user releases the key
				//upon release of the key the value is set back to false stopping the motion of the paddle
			}
			
			function loadInput() {
				
				document.getElementById("rowInput").value;
			}
			
			function collisionDetection() {
			//this code will detect if the ball hits a brick or not
				
				for (c = 0; c < brickColumnCount; c++) {
					for (r = 0; r < brickRowCount; r++) {
						var b = bricks[c][r];
				//with these lines we are calling the locations of the bricks
							
						if (b.status == 1) {	
						//this indicates that the following will only happen if the brick still exists
							if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
								dx = 10 * ((x-(b.x+brickWidth/2))/brickWidth);
								dy = -dy;
							//what this statement says is the if the coordinates of the ball (x and y) become equal to the coordinates of space that the brick takes up then the ball will change directions
								b.status = 0;
								//when the ball hits the brick and changes direction, the brick will change status to 0 and will not be redrawn
								score++;
								hiScore++;
								//this will add 1 to the score for each brick hit
								if (hiScore == brickRowCount*brickColumnCount) {
									brickRowCount++;
									b.status = 1
									score = -1;
									lives++;
									drawBricks();
									draw();
									x = canvas.width/2+dx;
									y = canvas.height/4;
								//when the score is equal to the number of bricks on screen then the game is won b/c all the bricks are hit
								//the game will subsequently reload
								}
							}
						}
					}
				}
			}
			
			function preLoad() {
				ctx.font = "30px Arial";
				ctx.fillStyle = "aqua";
				ctx.fillText("Click to Play!", canvas.width/3, canvas.height/2);
			}
			
			function drawScore() {
				ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				//sets the color of the text
				ctx.fillText("Score: " +score, canvas.width/2, 20);
				//sets the actual text onto the canvas. the numbers are the coordinates of the canvas
			}
			
			function drawHiScore() {
				ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.fillText("Hi-Score: " +hiScore, 8, 20);
			}
				
			function drawLives() {
				ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.fillText("Lives: " +lives, canvas.width-65, 20);
				//similar to the drawScore() but on the other side of the screen
			}
				
			function drawBall() {
			//code to redraw the ball
				
				ctx.beginPath();
				ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
				//.arc(x, y, r, sAngle, eAngle, ccw)
				//the ball starts at a definite position with a previously declared radius
				
				ctx.fillStyle = "orange";
				ctx.fill();
				ctx.closePath();
			}
			
			function drawPaddle() {
			//this is the code that will draw and redraw the user's paddle for every frame
				
				ctx.beginPath();
				ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
				//.rect(x, y, width, height)
				//simply making positioning and shaping the paddle
				
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
				
			}
			
			function drawBricks() {
			//this will loop through all the bricks in the array and draw the bricks on screen
				
				for (c = 0; c < brickColumnCount; c++) {
				//when there are no columns, we will add columns
					for (r = 0; r < brickRowCount; r++) {
					//when there are no rows, we will add rows
						
						if (bricks[c][r].status == 1) {
						//only bricks with status 1 will be drawn. if status is 0 then the brick has been hit and we do not want it anymore
							
							var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
							//each new brick in the row will be positioned by taking the current column number and from there define the bricks width and padding and side offset so that each brick will be next to each other without touching the side of the screen
							var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
							//each new brick in the column will be placed based on the row number and below the brick above it, with the topmost brick offset from the top of the page
							
							bricks[c][r].x = brickX;
							bricks[c][r].y = brickY;
							//the bricks will be added at these coordinates which dynamically change depending on the number of bricks that are present which will prevent them from being drawn atop one another
							
							ctx.beginPath();
							ctx.rect(brickX, brickY, brickWidth, brickHeight);
							//this is the bricks size, starting at the new location
							//by leaving the size as variables, we can manipulate them to incorporate for further game elements
							ctx.fillStyle = rowColors[c];
							//this will define the colors for each index number of the [c] based on the colors defined in the variable
							ctx.fill();
							ctx.closePath();
						}
					}
				}
			}
			
			function draw() {
			//code to continuously redraw the frame
					
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//this will clear the canvas every frame before drawing to simulate movement
				
				drawBricks();
				//the bricks will be drawn at the start of the game
				
				drawBall();
				//it will call this function to make the ball on a new frame
				
				drawPaddle();
				//this will draw the paddle on each new frame
				
				drawScore();
				
				drawHiScore();
				
				drawLives();
				
				collisionDetection();
				
				x += dx;
				y += dy;
				//this will continuously redraw the ball at a new position
				
				if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
					dx = -dx;
				//when the ball goes past the x values of the canvas, the movement will become negative, changing the direction of the ball giving the "bounce" effect
				}
				
				if (y + dy < ballRadius) {
					dy = -dy;
				//the ball radius is 10px. when the center of the ball reaches the y-position of 10px, the direction will reverse but it will make it look like it actually bounced.
				//the collision of the ball is actually the center so we want to adjust for that in our code
				}
				
//how could I make the ball change color with every bounce?		
				
				else if (y + dy > canvas.height-paddleHeight-ballRadius) {
				//if the ball falls to the bottom of the canvas then...
					
					if (x > paddleX && x < paddleX + paddleWidth) {
						dx = 8 * ((x-(paddleX+paddleWidth/2))/paddleWidth);
						//will allow for slightly better angled hits with the paddle
						dy = -dy;
					//it will check the ball's x-position is between contained within the paddle's x-position then the ball's direction will reverse, but...
					}
					
					else {
					
						lives--;
						//this will detract a life each time
						if (!lives) {
							alert("GAME OVER");
							document.location.reload();
						}
						//if the ball goes past the bottom of the screen and there are no more lives, the page will reload
						else {
							x = canvas.width/2;
							y = canvas.height-30;
							dx = dx;
							dy = dy;
							paddleX = (canvas.width-paddleWidth)/2;
						//if there are still lives then the game will reset the position of the ball and the paddle
						}
					
					}
				}		
				
				if (rightPressed && paddleX < canvas.width-paddleWidth) {
					paddleX += 7;
				//the paddle will be redrawn for each frame
				//the && is an operator which requires both conditions to be true. the right key MUST be pressed for the paddle to move and the paddle has to be WITHIN the right border of the canvas 
				//the paddle will then move 7px to the right upon keypress
				}
				
				else if (leftPressed && paddleX > 0) {
					paddleX -= 7;
				//the same but for the left of the screen
				}
			}

//how could I change the speed and size of the paddle? (ie. powerUps)
//how can I change the speed of the ball when it hits the paddle?
			
			document.addEventListener("mousemove", mouseMoveHandler, false);
			//this allows for the user to control the paddle with the mouse instead of the arrow keys
			
			function mouseMoveHandler(e) {
				var relativeX = e.clientX - canvas.offsetLeft;
				//the mouse will operate in the viewport (e.clientX) which is the canvas location
				if (relativeX > 0 && relativeX < canvas.width) {
					paddleX = relativeX - paddleWidth/2;
				//when the mouse is within the canvas boundaries then the middle of the paddle will be the position of the mouse
				//we restricted the movement to the size of the canvas so the paddle cannot go offscreen
				}
			}
			

			
			//this begins the draw function and also sets the speed of the draw function in milliseconds
			draw();
			
			function beginGame() {
			
				setInterval(draw, 10);
			}
//			draw();
			
//			requestAnimationFrame(draw,10);
			//these two lines results in a smoother animation loop than the setInterval()
			//there is no more fixed 10 millisecond frame rate rather we are giving control to the browser for better sync
			