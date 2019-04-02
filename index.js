(() => {
    const SPEED = 100;
    const SIZE = 18;
    let playerState = 0;
    let playerHeight = 0;
    let playerJumping = false;
    let playerFalling = false;
    let imagesToLoad = 9;
    let started = false;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const HEIGHT = canvas.height;
    const WIDTH = canvas.width;
    let jumpInterval = null;
    let obstacleInterval;
    let score = 0;
    let obstacles = [];
    let intervalID;

    const drawSky = () => {
        ctx.drawImage(back1, 0, 0);
        ctx.drawImage(back2, 0, 0);
        ctx.drawImage(back3, 0, 0);
        ctx.drawImage(back4, 0, 0);
    };

    const drawGround = () => {
        let i;
        for (i = 0; i < WIDTH - ground.width; i += ground.width)
            ctx.drawImage(ground, i, HEIGHT - ground.height);
        ctx.drawImage(ground, i, HEIGHT - ground.height);
    };

    const drawPlayer = () => {
        if (!playerJumping && !playerFalling) {
            switch (playerState % 3) {
                case 0:
                    ctx.drawImage(run1, 25, HEIGHT - 2 * ground.height - 5);
                    break;

                case 1:
                    ctx.drawImage(run2, 25, HEIGHT - 2 * ground.height - 5);
                    break;

                case 2:
                    ctx.drawImage(run3, 25, HEIGHT - 2 * ground.height - 5);
                    break;
            }

            playerState++;
            return;
        }
        ctx.drawImage(jump, 25, HEIGHT - 2 * ground.height - 5 - playerHeight);
    };

    const drawObstacle = width => {
        if (
            width >= 25 &&
            width + ground.width >= 25 &&
            width + ground.width <= 25 + run1.width &&
            playerHeight <= ground.height
        ) {
            clearInterval(obstacleInterval);
            clearInterval(jumpInterval);
            clearInterval(intervalID);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            drawSky();
            ctx.font = "20px Arial";
            ctx.fillText("You Lost !", 90, HEIGHT / 5);
            ctx.fillText(`Score: ${score}`, 100, HEIGHT / 5 - 50);
            return;
        }
        ctx.drawImage(ground, width, HEIGHT - 2 * ground.height);
    };

    const generateObstacle = () => {
        if (Math.floor(Math.random() * 10) % 2 == 0) {
            obstacles.push(WIDTH - ground.width);
        }
    };

    const drawScore = () => {
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 30, 30);
    };

    const setUp = () => {
        drawSky();
        drawGround();
        drawPlayer();
    };

    const update = () => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        drawSky();
        drawGround();
        drawScore();
        drawPlayer();
        obstacles = obstacles.map(elem => {
            return elem - SPEED / 5;
        });
        obstacles.forEach(elem => {
            if (elem >= 0) drawObstacle(elem);
            else {
                obstacles.shift();
                score++;
            }
        });
    };

    const loader = setInterval(() => {
        if (imagesToLoad == 0) {
            clearInterval(loader);
            setUp();
        }
    });

    document.body.addEventListener("keyup", e => {
        if (e.keyCode === 32) {
            // space bar down
            if (!jumpInterval) {
                playerJumping = true;
                jumpInterval = setInterval(() => {
                    if (playerJumping) {
                        playerHeight++;
                        if (playerHeight == 3 * SIZE) {
                            playerFalling = true;
                            playerJumping = false;
                        }
                    } else {
                        playerHeight--;
                        if (playerHeight == 0) {
                            playerFalling = false;
                            clearInterval(jumpInterval);
                            jumpInterval = null;
                        }
                    }
                }, 1);
            }
        } else if (e.keyCode === 13) {
            // enter down
            if (!started) {
                started = true;
                intervalID = setInterval(update, SPEED);
                obstacleInterval = setInterval(() => {
                    generateObstacle();
                }, 1000);
            }
        }
    });

    const back1 = new Image();
    back1.src = "./assets/background/0.png";
    back1.onload = () => {
        imagesToLoad--;
    };

    const back2 = new Image();
    back2.src = "./assets/background/1.png";
    back2.onload = () => {
        imagesToLoad--;
    };

    const back3 = new Image();
    back3.src = "./assets/background/2.gif";
    back3.onload = () => {
        imagesToLoad--;
    };

    const back4 = new Image();
    back4.src = "./assets/background/3.png";
    back4.onload = () => {
        imagesToLoad--;
    };

    const ground = new Image();
    ground.src = "./assets/background/ground.png";
    ground.onload = () => {
        imagesToLoad--;
    };

    const run1 = new Image();
    run1.src = "./assets/sprites/run1.png";
    run1.onload = () => {
        imagesToLoad--;
    };

    const run2 = new Image();
    run2.src = "./assets/sprites/run2.png";
    run2.onload = () => {
        imagesToLoad--;
    };

    const run3 = new Image();
    run3.src = "./assets/sprites/run3.png";
    run3.onload = () => {
        imagesToLoad--;
    };

    const jump = new Image();
    jump.src = "./assets/sprites/jump.png";
    jump.onload = () => {
        imagesToLoad--;
    };
})();
