import p5 from 'p5';
function sketch(p) {
    p.setup = function () {
        p.createCanvas(400, 400);
        p.background(0);
    };
}
new p5(sketch);
