const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 1520
// canvas.width = window. innerWidth; 
canvas.height = 677
// canvas.height = window. innerHeight; 

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 2.9


const background = new Sprite({
    position: {
        x: 0,
        y: 0,
        
    },
    // imageSrc: './img/background5.jpg'
    imageSrc: localStorage.getItem(1)
   
    
})





// const shop = new Sprite({
//     position: {
//         x: 600,
//         y: 128
//     },
//     imageSrc: './img/shop.png',
//     scale: 2.75,
//     frameMax: 6
// })


const player = new Fighter({
    position: {
        x: 600,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    
    frameMax: 10,
    scale:3,
    offset: {
        x:215,
        y:157
    },
    
    sprites:{
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            frameMax: 10
        },
        run:{
            imageSrc: './img/samuraiMack/Run.png',
            frameMax: 8
        
        },
        jump:{
            imageSrc: './img/samuraiMack/Jump.png',
            frameMax: 3
        
        },
        fall:{
            imageSrc: './img/samuraiMack/Fall.png',
            frameMax: 3
        },
        attack1:{
            imageSrc: './img/samuraiMack/Attack1.png',
            frameMax: 7
        },
        takeHit:{
            imageSrc: './img/samuraiMack/Take hit.png',
            frameMax: 3
        },
        death:{
            imageSrc: './img/samuraiMack/Death.png',
            frameMax: 7
        }

    },
    attackBox:{
        offset:{
            x:90,
            y:50
        },
        width:70,
        height:50
    }
})




const enemy = new Fighter({
    position: {
        x: 900,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/kenji/Idle.png',
    frameMax: 8,
    scale:2.3,
    offset: {
        x:215,
        y:238
    },
   
    sprites:{
        idle: {
            imageSrc: './img/kenji/Idle.png',

            frameMax: 8
        },
        run:{
            imageSrc: './img/kenji/Run.png',
            frameMax: 8
        
        },
        jump:{
            imageSrc: './img/kenji/Jump.png',
            frameMax: 2
        
        },
        fall:{
            imageSrc: './img/kenji/Fall.png',
            frameMax: 2
        },
        attack1:{
            imageSrc: './img/kenji/Attack1.png',
            frameMax: 8
        },
        takeHit:{
            imageSrc:'./img/kenji/Take hit.png',
            frameMax: 3
        },
        death:{
            imageSrc: './img/kenji/Death.png',
            frameMax: 7
        }


    },
    attackBox:{
        offset:{
            x:-140,
            y:50
        },
        width:130,
        height:50
    }
})

// console.log(player)

const key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreaseTimer()


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    // shop.update()
    c.fillStyle ='rgba(255,255,255,0.1)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    
    if (key.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if (key.d.pressed && player.lastkey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else{
        player.switchSprite('idle')
    }

    //jumping player
    if(player.velocity.y<0){
       player.switchSprite('jump')
    }
    else if(player.velocity.y>0){
        player.switchSprite('fall')
    }



    // enemy movement
    if (key.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }
    else if (key.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else{
        enemy.switchSprite('idle')
    }
     //jumping enemy    
     if(enemy.velocity.y<0){
        enemy.switchSprite('jump')
     }
     else if(enemy.velocity.y>0){
         enemy.switchSprite('fall')
     }

    // detect for collision & enemy get hit
    if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking && player.frameCurrent===4) {
        enemy.takeHit()
        player.isAttacking = false
        
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        gsap.to('#enemyHealth',{
            width:enemy.health + '%'
        })
    }

    // if player misses
    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false
    }

    // this is where our player hit
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking && enemy.frameCurrent === 2) {
        player.takeHit()
        enemy.isAttacking = false
        // console.log('enemy is Attacking')
        // document.querySelector('#playerHealth').style.width = player.health + '%'
        gsap.to('#playerHealth',{
            width:player.health + '%'
        })
    }

     // if enemy misses
     if(enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking = false
    }
    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate()


window.addEventListener('keydown', (event) => {
    if(!player.dead){

    
    switch (event.key) {
        case 'd':
            key.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            key.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            player.velocity.y = -38
            break
        case ' ':
            player.attack()
            sword.play();
            break

        }
    }

    if(!enemy.dead){
    
switch(event.key){
    case 'ArrowRight':
            key.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -38
            break
        case 'ArrowDown':
            enemy.attack()
            woo1.play();
            break
}
    
}

})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = false
            break
        case 'a':
            key.a.pressed = false
            break

    }

    // enemy key
    switch (event.key) {
        case 'ArrowRight':
            key.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false
            break

    }
})





// voice command

// if(annyang){
//     var commands={
//         // 'forward': function(){alert('helloooo');}
//         'forward': function(){ key.d.pressed = true
//             player.lastkey = 'd'
//         setTimeout(()=>{
//             key.d.pressed = false
//             annyang.start()
//         },500)
//         },
//         'stop': function(){ key.d.pressed = false
//             player.lastkey = 'd' },
//         'back': function(){key.a.pressed = true
//             player.lastkey = 'a'
//             setTimeout(()=>{
//                 key.a.pressed = false
//                 annyang.start()
//             },500)},
//         'jump': function(){player.velocity.y = -38 
//             annyang.start()},
//         'attack': function(){ player.attack()
//             annyang.start()}
//     };
//     annyang.addCommands(commands);
//     annyang.start();
// }


//Sound Effect
var sword =new Audio("./audio/sword sound.mp4");
var player_take_hit =new Audio("./audio/sword sound.mp4");
var player_take_hit =new Audio("./audio/sword sound.mp4");
var woo1 =new Audio("./audio/woo1.mp3");
var fight = new Audio("./audio/fight-deep-voice.mp3");
fight.play();
// draw_music.play();
var game_sound =new Audio("./audio/game_bgm.mp3");
game_sound.loop=true;
game_sound.volume=0.3;
game_sound.play();