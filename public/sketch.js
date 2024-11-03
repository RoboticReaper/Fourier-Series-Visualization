
let time = 0;
let waveX = [];
let waveY = []
let slider;

let pc = fetch('pc', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
})

let nc = fetch('nc', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
})

let scale;

let cc = fetch('/cc', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
})

let readyToDraw = false

function setup() {
    createCanvas(600, 600);
    slider = createSlider(1, 100000, 200)

    Promise.all([cc, pc, nc]).then(async (value) => {
        cc = await value[0].json()
        cc = math.complex(cc.real, cc.imaginary)

        pc = await value[1].json()
        pc = pc.map((num) => {
            return math.complex(num.real, num.imaginary)
        })

        nc = await value[2].json()
        nc = nc.map((num) => {
            return math.complex(num.real, num.imaginary)
        })

        console.log("Positive coefficients")
        console.log(pc)
        console.log("Negative coefficients")
        console.log(nc)
        console.log("Center coefficient")
        console.log(cc)

        readyToDraw = true
    })
}

function draw() {
    background(0);
    stroke(255, 30);
    line(0, 300, 600, 300)
    line(300, 0, 300, 600)
    translate(300, 300);
    scale = slider.value()/1000


    if (readyToDraw) {
        actuallyDraw()
    }

}


function actuallyDraw() {
    let sum = math.complex(0, 0)

    let radius = math.multiply(scale, cc)
    let result = math.multiply(radius, math.exp((math.complex(0, time * 0))));

    let prevx = math.re(sum)
    let prevy = math.im(sum)
    let real = math.re(result)
    let imaginary = math.im(result)

    stroke(255, 100);
    noFill();
    ellipse(prevx, -prevy, math.sqrt(real * real + imaginary * imaginary) * 2);

    stroke(150);
    line(prevx, -prevy, prevx + real, -prevy - imaginary);

    sum = math.add(sum, result)



    for (let i = 0; i < pc.length; i++) {

        radius = math.multiply(scale, pc[i])
        result = math.multiply(radius, math.exp((math.complex(0, time * (i + 1)))));

        prevx = math.re(sum)
        prevy = math.im(sum)
        real = math.re(result)
        imaginary = math.im(result)

        stroke(255, 100);
        noFill();
        ellipse(prevx, -prevy, math.sqrt(real * real + imaginary * imaginary) * 2);

        stroke(150);
        line(prevx, -prevy, prevx + real, -prevy - imaginary);

        sum = math.add(sum, result)


        radius = math.multiply(scale, nc[i])
        result = math.multiply(radius, math.exp((math.complex(0, time * (-i - 1)))));

        prevx = math.re(sum)
        prevy = math.im(sum)
        real = math.re(result)
        imaginary = math.im(result)

        stroke(255, 100);
        noFill();
        ellipse(prevx, -prevy, math.sqrt(real * real + imaginary * imaginary) * 2);

        stroke(150);
        line(prevx, -prevy, prevx + real, -prevy - imaginary);

        sum = math.add(sum, result)
    }


    waveX.unshift(math.re(sum));
    waveY.unshift(-math.im(sum))



    //line(x , y, 0, wave[0]);
    beginShape();
    noFill();
    for (let i = 0; i < waveX.length; i++) {
        stroke(255)
        vertex(waveX[i], waveY[i]);
    }
    endShape();

    time += 0.02;


    if (waveX.length > 350) {
        waveX.pop();
        waveY.pop()
    }
}