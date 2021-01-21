const cnv = document.getElementById(`mycanvas`)
const ctx = cnv.getContext(`2d`)
cnv.width = 1000; cnv.height = 1000
let center = {x:cnv.width/2, y:cnv.height/2}
drawPlane()
//draw the grid
function drawPlane(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,cnv.width,cnv.height)
    ctx.fillStyle = 'black'
    for (let n = 0; n <= center.x; n+= center.x/10) {
        if (n==0) {
            lineWidth = 3
        } else {
            lineWidth = 1
        }
        line(0,center.y + n,cnv.width,center.y + n , lineWidth)
        line(0,center.y - n,cnv.width,center.y - n , lineWidth)
        line(center.x + n, 0, center.x + n, cnv.height, lineWidth)
        line(center.x - n, 0, center.x - n, cnv.height, lineWidth)
    }
}
document.getElementById('submit').addEventListener('click',graph)
//clear the plane by clicking this button! redrwas grid from scratch
document.getElementById('clear').addEventListener('click', drawPlane)
//graph a function once expression has been submitted
function graph(){
    let equation = document.getElementById('equation').value
    //make x values left of center negative, scale plane by factor of 1/50 so the width should be 20 units
    for (let x = -center.x/50; x <=center.x/50; x+=0.001){
        let valueArray = equation.split(' ')
        let stringX = String(x)
        for (let i =0; i < valueArray.length; i ++) {
            if (valueArray[i].includes('x')) {
                valueArray[i] = valueArray[i].replaceAll('x', stringX)
            }
        }
        for (let i =0; i < valueArray.length; i ++) {
            if (valueArray[i].startsWith('sin')) {
                if (valueArray[i].includes('(')) {
                    valueArray[i] = valueArray[i].replace('sin(',"")
                    calc(i,valueArray,x)
                    
                    valueArray[i] = String(Math.sin(Number(valueArray[i])))
                } else {
                    valueArray[i] = valueArray[i].replaceAll('sin', '')
                    valueArray[i] = String(Math.sin(Number(valueArray[i])))
                }
            } else if(valueArray[i].startsWith('cos')){
                if (valueArray[i].includes('(')) {
                    valueArray[i] = valueArray[i].replace('cos(',"")
                    calc(i,valueArray,x)
                    
                    valueArray[i] = String(Math.cos(Number(valueArray[i])))
                } else {
                    valueArray[i] = valueArray[i].replaceAll('cos', '')
                    valueArray[i] = String(Math.cos(Number(valueArray[i])))
                }
            } else if(valueArray[i].startsWith('tan')){
                if (valueArray[i].includes('(')) {
                    valueArray[i] = valueArray[i].replace('tan(',"")
                    calc(i,valueArray,x)
                    
                    valueArray[i] = String(Math.tan(Number(valueArray[i])))
                } else {
                    valueArray[i] = valueArray[i].replaceAll('tan', '')
                    valueArray[i] = String(Math.tan(Number(valueArray[i])))
                }
            }
        }
        for (let i =0; i < valueArray.length; i ++) {
            if (valueArray[i].startsWith('(')) {
                valueArray[i] = valueArray[i].replaceAll('(', "")
                calc(i ,valueArray, x)
            }
        }
        for (let i =0; i < valueArray.length; i ++) {
            if (valueArray[i] == '^'){
                valueArray[i-1] = Number(valueArray[i-1]) ** Number(valueArray[i+1])
                valueArray.splice(i,2)
                i -=2
            }
        }
        for (let i =0; i < valueArray.length; i ++) {
            if (valueArray[i] == '*'){
                valueArray[i-1] = Number(valueArray[i-1]) * Number(valueArray[i+1])
                valueArray.splice(i,2)
                i -=2
            }else if (valueArray[i] == '/'){
                valueArray[i-1] = Number(valueArray[i-1])/Number(valueArray[i+1])
                valueArray.splice(i,2)
                i -=2
            }
        }
        for (let i =0; i < valueArray.length; i ++) {
            if (valueArray[i] == '+'){
                valueArray[i-1] = Number(valueArray[i-1]) + Number(valueArray[i+1])
                valueArray.splice(i,2)
                i -=2
            }else if (valueArray[i] == '-'){
                valueArray[i-1] = Number(valueArray[i-1]) - Number(valueArray[i+1])
                valueArray.splice(i,2)
                i -=2
            }
        }
        
        let y = valueArray[0]
        //convert scaled x values into suitable values for canvas, shift 500 right, to center, shift y down 500, to center and move up when y increases like a normal person would
        circle(x * 50 + 500,500-50 * y,2,'fill')
    }
}
//calculate stuff inside of brackets (and subsequent brackets)
function calc(start,valueArray, x){
    let max = valueArray.length
    for (let i =start; i < max; i ++) {
        if (valueArray[i].startsWith('sin')) {
            if (valueArray[i].includes('(')) {
                valueArray[i] = valueArray[i].replace('sin(',"")
                calc(i,valueArray,x)
                valueArray[i] = String(Math.sin(valueArray[i]))
            } else {
                valueArray[i] = valueArray[i].replaceAll('sin', '')
                valueArray[i] = String(Math.sin(Number(valueArray[i])))
            }
        } else if(valueArray[i].startsWith('cos')){
            if (valueArray[i].includes('(')) {
                valueArray[i] = valueArray[i].replace('cos(',"")
                calc(i,valueArray,x)
                
                valueArray[i] = String(Math.cos(Number(valueArray[i])))
            } else {
                valueArray[i] = valueArray[i].replaceAll('cos', '')
                valueArray[i] = String(Math.cos(Number(valueArray[i])))
            }
        } else if(valueArray[i].startsWith('tan')){
            if (valueArray[i].includes('(')) {
                valueArray[i] = valueArray[i].replace('tan(',"")
                calc(i,valueArray,x)
                
                valueArray[i] = String(Math.tan(Number(valueArray[i])))
            } else {
                valueArray[i] = valueArray[i].replaceAll('tan', '')
                valueArray[i] = String(Math.tan(Number(valueArray[i])))
            }
        }
    }
    for (let i =start; i < max; i ++) {
        if (valueArray[i].startsWith('(')) {
            valueArray[i] = valueArray[i].replaceAll('(', "")
            calc(i ,valueArray, x)
        } else if (valueArray[i].endsWith(')')){
            valueArray[i] = valueArray[i].replaceAll(')', "")
            max = i
        }
    }
    for (let i =start; i < max; i ++) {
        if (valueArray[i] == '^'){
            valueArray[i-1] = Number(valueArray[i-1]) ** Number(valueArray[i+1])
            valueArray.splice(i,2)
            i -=2
        }
    }
    for (let i =start; i < max; i ++) {
        if (valueArray[i] == '*'){
            valueArray[i-1] = Number(valueArray[i-1]) * Number(valueArray[i+1])
            valueArray.splice(i,2)
            i -=2
        }else if (valueArray[i] == '/'){
            valueArray[i-1] = Number(valueArray[i-1]) / Number(valueArray[i+1])
            valueArray.splice(i,2)
            i -=2
        }
    }
    for (let i =start; i < max; i ++) {
        if (valueArray[i] == '+'){
            valueArray[i-1] = Number(valueArray[i-1]) + Number(valueArray[i+1])
            valueArray.splice(i,2)
            i -=2
        }else if (valueArray[i] == '-'){
            valueArray[i-1] = Number(valueArray[i-1]) - Number(valueArray[i+1])
            valueArray.splice(i,2)
            i -=2
        }
    }
}