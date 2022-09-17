const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width
const HEIGHT = canvas.height
const GRAVITY_SCALE = 10

const print = (t) => console.log(t)

let degree = 0

//Class
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(b) {
        this.x += b.x
        this.y += b.y
    }
    setAboutFlat(x, y) {
        this.x = x
        this.y = HEIGHT - y
    }
    clone() {
        return new Vector(this.x, this.y)
    }
}

class Ball {
    constructor(radius, power, angle) {
        this.pos = new Vector(0, HEIGHT - radius)
        let radian = (angle * Math.PI) / 180;
        this.vel = new Vector(
            power * Math.cos(radian),
            -power * Math.sin(radian)
        )
        this.r = radius
    }
    draw() {
        //Object
        ctx.beginPath()
        ctx.arc(this.x, this.GravityCenter, this.r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        //Speed
        ctx.beginPath()
        ctx.strokeStyle = "red"
        ctx.moveTo(this.x, this.GravityCenter)
        ctx.lineTo(this.x + this.vel.x * 10, this.GravityCenter + this.vel.y * 10)
        ctx.stroke()
        ctx.closePath()
    }
    move() {
        this.vel.y += GRAVITY_SCALE * 0.025
        this.pos.add(this.vel)
    }
    get x() {
        return this.pos.x
    }
    get y() {
        return this.pos.y
    }
    get GravityCenter() {
        return this.y - this.r
    }

}

function getDegree(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

const ExperimentObjects = []
let ToDestroyObjects = []

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.font = "bold 20px Arial, sans-serif"
    ctx.fillText(`${degree.toFixed(2)}º`, 5, 25, 350)
    ctx.closePath()

    for (var i in ExperimentObjects) {
        ExperimentObjects[i].draw()
        ExperimentObjects[i].move()
        if (ExperimentObjects[i].y - ExperimentObjects[i].r * 2 > HEIGHT) {
            ToDestroyObjects.push(i)
        }
    }
    for (var i of ToDestroyObjects) {
        ExperimentObjects.splice(i, 1)
    }
    ToDestroyObjects = []
    requestAnimationFrame(render)
}

function onMove_Canvas(event) {
    let _x = event.offsetX
    let _y = HEIGHT - event.offsetY
    degree = getDegree(_x, _y)
}

function onClick_Canvas(event) {
    let _x = event.offsetX
    let _y = HEIGHT - event.offsetY
    let _power = Math.sqrt(_x ** 2 + _y ** 2) * 0.02
    ExperimentObjects.push(new Ball(15, _power, degree))
}

canvas.addEventListener("mousemove", onMove_Canvas)
canvas.addEventListener("click", onClick_Canvas)

render()