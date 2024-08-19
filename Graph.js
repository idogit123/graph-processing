export class Graph {

    constructor(elementId, min, max)
    {
        this.graph = new p5(this.sketch, elementId) 
        this.points = []
        this.currentSize = 0

        this.min = min
        this.max = max
    }

    sketch(p) {
        p.setup = function() {
            p.createCanvas(400, 400)
            p.background(0)
    
            const startButton = p.createButton('Start')
        }
    }
}