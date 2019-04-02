(() => {
    const SPEED = 50;
    let score = 0;
    const canvas = document.getElementById("canvas");
    const HEIGHT = canvas.height;
    const WIDTH = canvas.width;
    const SIZE = 50;
    const ctx = canvas.getContext("2d");
    let started = false;
    let intervalID;
    let playerUp = false;
    let pos;
    let jumpInterval = null;

    const drawPlayer = () => {
        ctx.fillStyle = "red";
        ctx.fillRect(SIZE, HEIGHT - 2 * SIZE - pos, SIZE, SIZE);
    };

    const drawGround = () => {
        ctx.fillStyle = "green";
        ctx.fillRect(0, HEIGHT - SIZE, WIDTH, SIZE);
    };

    const update = () => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        // drawSky();
        drawPlayer();
        drawGround();
    };

    const setUp = () => {
        pos = 0;
        drawPlayer();
        drawGround();

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Press ENTER to start", 250, 200);
    };

    setUp();

    document.body.addEventListener("keyup", e => {
        if (e.keyCode === 32) {
            // space bar down
            if (!jumpInterval) {
                playerUp = true;
                jumpInterval = setInterval(() => {
                    if (pos == SIZE * 2 - 1) playerUp = false;
                    if (playerUp) pos++;
                    else {
                        pos--;
                        if (pos == 0) {
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
            }
        }
    });
})();
