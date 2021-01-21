
//draw a rect
function rect(x1, y1, w, h, mode){
    if (mode == "fill"){
        ctx.fillRect(x1, y1, w, h)
    } else {
        ctx.strokeRect(x1, y1, w, h)
    }
}

//draw a line
function line(x1, y1, x2, y2, lineWidth) {
    
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2)
    ctx.stroke();
};

//draw a cricle
function circle(x, y, r ,mode){
    ctx.beginPath()
    ctx.arc(x, y, r, 0 ,2* Math.PI)
    if(mode == "fill"){
        ctx.fill()
    } else {
        ctx.stroke()
    } 
}

//draw a triangle
function triangle (x1, y1, x2, y2, x3, y3, mode){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2)
    ctx.lineTo(x3,y3)
    if (mode == "stroke"){
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.fill()
    }

}
//draw a text
function text(message, x,y,size,font, mode){
    console.log(size + " " + font)
    ctx.font = size + " " + font;
    ctx.fillText(message, x , y)
}

//draw ellipse
function ellipse(x,y, rx, ry, mode){
    ctx.beginPath();
    ctx.ellipse(x, y, rx ,ry, 0, 0, 2*Math.PI)
    if (mode == "fill") {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}
