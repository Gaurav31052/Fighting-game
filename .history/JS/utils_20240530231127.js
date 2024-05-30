function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    document.querySelector('#displayText2').style.display = 'flex'
    document.querySelector('#displayText2').style.display = 'flex'
    // document.querySelector('#displayText4').style.display = 'flex'
    // document.querySelector('#displayText5').style.display = 'flex'
    if (player.health === enemy.health) {
        game_sound.pause();
        draw.loop=true;
        draw.play();
        document.querySelector('#displayText').innerHTML = 'Tie'
        document.querySelector('#displayText2').innerHTML = 'Last Fight'
        // document.querySelector('#displayText4').innerHTML = 'Reply'
        // document.querySelector('#displayText5').innerHTML = 'home'
    }
    else if (player.health > enemy.health) {
        game_sound.pause();
        winning.play()
        document.querySelector('#displayText').innerHTML = 'Player-1 Wins!'
        document.querySelector('#displayText2').innerHTML = 'Last Fight'
    }
    else if (player.health < enemy.health) {
        game_sound.pause();
        winning.play()
        document.querySelector('#displayText').innerHTML = 'Player-2 Wins!'
        document.querySelector('#displayText2').innerHTML = 'Last Fight'
    }
}

let timer = 3;
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer;
    }
    if (timer == 0) {
        determineWinner({ player, enemy, timerId })
    }
}


var draw =new Audio("./audio/tie_bgm.mp3");
var winning =new Audio("./audio/winning audio.mp3");

