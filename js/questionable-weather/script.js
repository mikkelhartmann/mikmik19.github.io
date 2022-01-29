
document.getElementById('height').value = Math.min(document.body.clientWidth - 40, 400)
document.getElementById('width').value = Math.min(document.body.clientWidth - 40, 400)

let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
fxrand = getFxrand()
console.log(fxrand())

function getPalette() {
    if (fxrand()  > .96) return "Light"
    if (fxrand()  > .9) return "Brown"
    if (fxrand()  > .84) return "Silver"
    if (fxrand()  > .78) return "Purple"
    if (fxrand()  > .72) return "Pinks"
    if (fxrand()  > .66) return "MintOrange"
    if (fxrand()  > .60) return "Dusk"
    if (fxrand()  > .54) return "Reds"
    if (fxrand()  > .48) return "Golden"
    if (fxrand()  > .42) return "Dark Yellow"
    if (fxrand()  > .36) return "Gem"
    if (fxrand()  > .30) return "Dream"
    if (fxrand()  > .24) return "Purple Haze"
    if (fxrand()  > .18) return "Pity"
    if (fxrand()  > .12) return "Envy"
    if (fxrand()  > .06) return "Affection"
    return "Hope"
}

function getWeather() {
    if (fxrand() > .95) return "Tranquil"
    if (fxrand() > .8) return "Mild"
    if (fxrand() > .55) return "Rough"
    if (fxrand() > .4) return "Stormy"
    if (fxrand() > .3) return "Wild"
    if (fxrand() > .1) return "Questionable"
    return "Stormy"
}

function getSize() {
    let size = 0.20
    if (fxrand() > .8) return 0.35
    if (fxrand() > .6) return 0.25
    if (fxrand() > .4) return 0.20
    if (fxrand() > .2) return 0.15


    return size
}

function getInversion() {
    if (fxrand() > 0.5) return true
    return false
}

function getRandomHash() {
    return "oo" + Array(49).fill(0).map(_=>alphabet[(Math.random()*alphabet.length)|0]).join('')
}

function getFxrand() {
    let b58dec = str=>[...str].reduce((p,c)=>p*alphabet.length+alphabet.indexOf(c)|0, 0)
    var fxhash = document.getElementById('transactionHash').value
    let fxhashTrunc = fxhash.slice(2)
    let regex = new RegExp(".{" + ((fxhash.length/4)|0) + "}", 'g')
    let hashes = fxhashTrunc.match(regex).map(h => b58dec(h))
    let sfc32 = (a, b, c, d) => {
        return () => {
            a |= 0; b |= 0; c |= 0; d |= 0
            var t = (a + b | 0) + d | 0
            d = d + 1 | 0
            a = b ^ b >>> 9
            b = c + (c << 3) | 0
            c = c << 21 | c >>> 11
            c = c + t | 0
            return (t >>> 0) / 4294967296
        }
    }
    return sfc32(...hashes)
}

function setFeatures() {
    // Set value of all feature dropdown menus
    document.getElementById('palette').value = getPalette()
    document.getElementById('size').value = getSize()
    document.getElementById('weather').value = getWeather()
    document.getElementById('inverted').value = getInversion() ? 'Yes' : 'No'
}

document.getElementById('updateFeatures').onclick = function(){
    fxrand = getFxrand()
    console.log(fxrand())
    setFeatures()
}

document.getElementById('randomHash').onclick = function(){
    document.getElementById('transactionHash').value = getRandomHash()
    setFeatures()
}


document.getElementById('generate').onclick = function(){

    fxrand = getFxrand()
    document.getElementById('defaultCanvas0').remove()
    
    let height = document.getElementById('height').value
    let width = document.getElementById('width').value
    fxhash = document.getElementById('transactionHash').value
    run(width, height)
}

function run(width, height) {
    
    console.log(fxrand())

    // Get the features from the menu
    window.$fxhashFeatures = {
        "Palette": document.getElementById('palette').value,
        "Size": document.getElementById('size').value,
        "Weather": document.getElementById('weather').value,
        "Inverted": document.getElementById('inverted').value == 'Yes' ? true : false
    }
    
    
    let sketch = function (p) {

    
        let weatherSystem = [
            {
                name: "Tranquil",
                yNoiseScale: 0.015,
                xNoiseScale: 0.05,
                noiseIncrement: 0.009
            },
            {
                name: "Mild",
                yNoiseScale: 0.05,
                xNoiseScale: 0.01,
                noiseIncrement: 0.01
            },
            {
                name: "Rough",
                yNoiseScale: 0.08,
                xNoiseScale: 0.01,
                noiseIncrement: 0.0125
            },
            {
                name: "Stormy",
                yNoiseScale: 0.09,
                xNoiseScale: 0.01,
                noiseIncrement: 0.015
            },
            {
                name: "Wild",
                yNoiseScale: 0.10,
                xNoiseScale: 0.01,
                noiseIncrement: 0.0175
            },
            {
                name: "Questionable",
                yNoiseScale: 0.12,
                xNoiseScale: 0.01,
                noiseIncrement: 0.02
            }
        ]
    
        let palettes = [
            {
                name: "Brown",
                startColor: "rgb(188, 138, 75)",
                endColor: "rgb(85, 83, 75)"
            },
            {
                name: "Pinks",
                startColor: "rgb(254, 218, 215)",
                endColor: "rgb(191, 128, 129)"
            },
            {
                name: "Silver",
                startColor: "rgb(191, 202, 212)",
                endColor: "rgb(37, 52, 83)"
            },
            {
                name: "Purple",
                startColor: "rgb(149, 128, 255)",
                endColor: "rgb(87, 57, 127)"
            },
            {
                name: "MintOrange",
                startColor: "rgb(108, 200, 196)",
                endColor: "rgb(149, 91, 1)"
            },
            {
                name: "Dusk",
                startColor: "rgb(253, 248, 159)",
                endColor: "rgb(55, 42, 100)"
            },
            {
                name: "Reds",
                startColor: "rgb(215, 91, 64)",
                endColor: "rgb(115, 40, 51)"
            },
            {
                name: "Golden",
                startColor: "rgb(39, 63, 77)",
                endColor: "rgb(169, 131, 27)"
            },
            {
                name: "Dark Yellow",
                startColor: "rgb(199, 195, 96)",
                endColor: "rgb(62, 31, 28)"
            },
            {
                name: "Gem",
                startColor: "rgb(211, 169, 147)",
                endColor: "rgb(65, 4, 64)"
            },
            {
                name: "Dream",
                startColor: "rgb(112, 195, 129)",
                endColor: "rgb(161, 72, 106)"
            },
            {
                name: "Purple Haze",
                startColor: "rgb(160, 110, 40)",
                endColor: "rgb(64, 50, 157)"
            },
            {
                name: "Affection",
                startColor: "rgb(58, 139, 150)",
                endColor: "rgb(191, 55, 79)"
            },
            {
                name: "Pity",
                startColor: "rgb(111, 42, 61)",
                endColor: "rgb(133, 51, 59)"
            },
            {
                name: "Envy",
                startColor: "rgb(183, 212, 101)",
                endColor: "rgb(43, 21, 23)"
            },
            {
                name: "Hope",
                startColor: "rgb(64, 202, 194)",
                endColor: "rgb(6, 55, 74)"
            },
            {
                name: "Light",
                startColor: "rgb(204, 200, 214)",
                endColor: "rgb(149, 94, 167)"
            },
    
        ];
    
        let getIndex = function (properties, propertyName) {
            for (let i = 0; i < properties.length; i++) {
                if (properties[i].name === propertyName)
                    return i;
            }
            return -1;
        }
    
        let palette = getIndex(palettes, window.$fxhashFeatures["Palette"]);
        let weather = getIndex(weatherSystem, window.$fxhashFeatures["Weather"])
        let cloudHeightFactor = window.$fxhashFeatures["Size"]
    
    
        // I lock the noise seed here to make sure that the same hash generated
        // the same output
        p.noiseSeed(p.floor(fxrand()*1000))
        
        p.setup = function () {
            // disables scaling for retina screens which can create inconsistent scaling between displays
            p.pixelDensity(1);
            p.createCanvas(width, height);
            restart();
        }
    
        restart = function () {
            p.clear();
            counter = 0;
            p.resizeCanvas(width, height);
            p.background(220);
            makeArt()
        };
    
        makeArt = function() {
            let gradientStart = palettes[palette].startColor;
            let gradientEnd = palettes[palette].endColor;
    
            if (window.$fxhashFeatures["Inverted"]) {
                gradientStart = invertColor(gradientStart)
                gradientEnd = invertColor(gradientEnd)
            }
    
            let borderWidth = 0.05 * width;
            let xStepSize = 1;
            
            
            let lineLength = height * cloudHeightFactor;
    
            let yNoiseScale = height * weatherSystem[weather].yNoiseScale;
            let xNoiseScale = width * weatherSystem[weather].xNoiseScale;
            
            // I se the step to ensure that the is never any room 
            // between clouds. 
            let yStepSize = (lineLength + yNoiseScale)/6;
    
            let yoff = 0;
            let xoff = 0.0;
    
            let noiseIncrement = weatherSystem[weather].noiseIncrement;
    
            let yLoopStart = height - lineLength - yNoiseScale;
    
            // I start from the bottom and work my way up the canvas. This is 
            // to have to final cloud be on top.
            let breakNow = false
            for (let yIdx = yLoopStart; yIdx > borderWidth / 2; yIdx -= yStepSize) {
    
                // I progressively scale down the line length towards the 
                // end to have a more even looking spacing between clouds.
                if ((yIdx < height / 3) & (cloudHeightFactor>0.2)) {
                    lineLength = lineLength * 0.93
                }
                
                // I want to avoid drawing clouds too close to the top.
                let yStopLimit = (borderWidth + yNoiseScale)
                if (yIdx <= yStopLimit) {
                    breakNow = true;
                }
    
                yoff += noiseIncrement;   // Increment xoff 
    
                // Setting the color noise here so each layer will have consistent
                // coloring.
                nudgedGradientStart = nudgeColor(gradientStart);
                nudgedGradientEnd = nudgeColor(gradientEnd);
    
                for (let xIdx = borderWidth; xIdx < width; xIdx += xStepSize) {
    
                    xoff += noiseIncrement;   // Increment xoff 
                
                    let noiseLevel = p.noise(xoff, yoff);
                    
                    let yNoise = (noiseLevel * yNoiseScale);
                    let xNoise = (noiseLevel * xNoiseScale);
                    
                    let yStart = yIdx + yNoise;
                    let yEnd = yStart + lineLength - borderWidth - xNoise;
                    let x = xIdx;
    
                    if ((yEnd < (height - borderWidth)) && (x < width - borderWidth)) {
                        gradiant_line(nudgedGradientStart, nudgedGradientEnd, x, yStart, x, yEnd);
                    }
                }
    
                if (breakNow) {
                    break;
                }
            }
        }
    
        gradiant_line = function(s,  e, x, y, xx, yy) {
            for (let i = 0; i < 100; i++ ) {
                p.stroke(p.lerpColor(s, e, i / 100.0));
                p.line(((100 - i) * x + i * xx) / 100.0, ((100 - i) * y + i * yy) / 100.0,
                    ((100 - i - 1) * x + (i + 1) * xx) / 100.0, ((100 - i - 1) * y + (i + 1) * yy) / 100.0);
            }
        }
    
        invertColor = function(c) {
        return p.color(255 - p.red(c), 255 - p.green(c), 255 - p.blue(c));
    }
    
        nudgeColor = function(c) {
        return p.color(
            p.min(p.red(c) + 5, 255), 
            p.min(p.green(c) + 5, 255), 
            p.min(p.blue(c) + 5, 255));
    }
    
    };
    
    new p5(sketch, 'questionableWeather');
}

setFeatures()
let defaultSize = document.getElementById('height').value
run(defaultSize, defaultSize)