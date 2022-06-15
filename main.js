const gCanvas = document.querySelector('.my-canvas')
const gCtx = gCanvas.getContext('2d')

gCanvas.width = innerWidth - 5
gCanvas.height = innerHeight - 10

const gravity = 2.5

class Player {
    constructor() {
        this.pos = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        gCtx.fillStyle = 'red'
        gCtx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.pos.y += this.velocity.y
        this.pos.x += this.velocity.x

        if (this.pos.y + this.height + this.velocity.y <= gCanvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({ x, y }) {
        this.pos = {
            x,
            y,
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        gCtx.fillStyle = 'blue'
        gCtx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [new Platform({ x: 100, y: 200 }), new Platform({ x: 500, y: 300 })]
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    player.update()
    platforms.forEach((platform) => {
        platform.draw()
    })
    if (keys.right.pressed && player.pos.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.pos.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.pos.x -= 5
                scrollOffset += 5
            })
        } else if (keys.left.pressed) {
            platforms.forEach((platform) => {
                platform.pos.x += 5
                scrollOffset -= 5
            })
        }
    }
    //platform collision detaction
    platforms.forEach((platform) => {
        if (
            player.pos.y + player.height <= platform.pos.y &&
            player.pos.y + player.height + player.velocity.y >= platform.pos.y &&
            player.pos.x + player.width >= platform.pos.x &&
            player.pos.x + player.width >= platform.pos.x &&
            player.pos.x <= platform.pos.x + platform.width
        )
            player.velocity.y = 0
    })

    if (scrollOffset > 2000) console.log('you win');
}
animate()

addEventListener('keydown', ({ key }) => {
    console.log('key down', key)
    switch (key) {
        case 'a':
            console.log('left')
            keys.left.pressed = true
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = true
            break
        case 'w':
            console.log('up')
            player.velocity.y -= 26
            break
    }
})
addEventListener('keyup', ({ key }) => {
    console.log('key up', key)
    switch (key) {
        case 'a':
            console.log('left')
            keys.left.pressed = false
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = false
            break
        case 'w':
            console.log('up')
            player.velocity.y = 0
            break
    }
})
