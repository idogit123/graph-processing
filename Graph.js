export class Graph {
    /** 
     * Graph
     * @constructor
     * @param {string} elementId 
     * @param {number} graphHeight
     * @param {number} min
     * @param {number} max
     * @param {number} avarage
     * @param {number} noiseMult
     * @param {number} noiseSpeed
     * @param {number} colorR
     * @param {number} colorG
     * @param {number} colorB
    */
    constructor(elementId, graphHeight, min, max, avarage, noiseMult, noiseSpeed, colorR, colorG, colorB)
    {
        this.graph = new p5((p) => this.sketch(p, this), elementId) 
        this.graphHeight = graphHeight
        this.points = []
        this.cursor = new Cursor()
        this.active = false
        this.elementId = elementId

        this.min = min
        this.max = max
        this.avarage = avarage
        this.noiseMult = noiseMult
        this.noiseSpeed = noiseSpeed
        this.colorR = colorR
        this.colorG = colorG
        this.colorB = colorB
        this.BG_COLOR = 31
        
        document.getElementById(`${elementId}-title`).style = `color: rgb(${colorR}, ${colorG}, ${colorB});`
    }

    /**
     * @param { Graph } graph
    */
    sketch(p, graph) {
        p.setup = function() {
            p.createCanvas(p.canvas.parentElement.clientWidth, graph.graphHeight)
            p.background(graph.BG_COLOR)
            p.frameRate(30)
            p.windowResized = () => {
                p.resizeCanvas(p.canvas.parentElement.clientWidth, graph.graphHeight)
                p.background(graph.BG_COLOR)
            }
            
            document.getElementById(`${graph.elementId}-button`).onclick = () => graph.start(p)

            
            
        }

        p.draw = () => {
            if (graph.active)
                graph.draw(p)
        }
    }

    createSpeedText() {
        const speedText = document.createElement('p')
        speedText.innerText = `Speed: ~${this.avarage}/s`
        return speedText
    }

    start(p) {
        if (this.active)
        {
            this.reset(p)
        }
        else 
        {
            this.active = true
            const topbar = document.getElementById(`${this.elementId}-topbar`)
            topbar.insertBefore( this.createSpeedText(), topbar.children[1] )
        }   
    }

    draw(p) {
        p.background(this.BG_COLOR)
        this.show(p)
        this.cursor.show(p)

        this.addPoint(p)
        if (this.cursor.pos < p.width - 4)
            this.cursor.update()
    }

    show(p) {
        for (let i=1; i < this.points.length; i++)
        {
            const lastY = p.map(this.points[i-1], this.min, this.max, p.height, 0)
            const newY  = p.map(this.points[i]  , this.min, this.max, p.height, 0)
            

            p.stroke(this.colorR, this.colorG, this.colorB)
            p.strokeWeight(3)
            p.line(i-1, lastY, i, newY)
        }
    }

    addPoint(p) {
        this.points.push(this.newPoint(p))

        if (this.points.length > p.width - 4)
            this.points.shift()
    }

    newPoint(p) {
        return this.avarage + p.noise(p.frameCount * this.noiseSpeed) * this.noiseMult
    }

    reset(p) {
        this.points = []
        this.cursor.pos = 0
        this.active = false

        const topbar = document.getElementById(`${this.elementId}-topbar`)
        topbar.removeChild(topbar.children[1])
        p.background(this.BG_COLOR)
    }
}

class Cursor {
    constructor() {
        this.pos = 0
    }

    show(p) {
        p.stroke(255)
        p.line(this.pos, 0, this.pos, p.height)
        p.fill(255)
        p.noStroke()
        p.circle(this.pos, 4, 8)
    }

    update() {
        this.pos++
    }
}