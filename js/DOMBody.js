import Matter from "matter-js";

class DOMBody {
    static fromElement(elem, $ = window.jQuery) {
        var $elem = $(elem);
        var left = $elem.offset().left;
        var top = $elem.offset().top;
        var w = $elem.width();
        var h = $elem.height();
        var x = left + w/2; // Matter.js uses center-origin shapes
        var y = top + h/2;
        const domBody = new this(elem, x, y, w, h);
        return domBody;
    }
    
    constructor(elem, x, y, w, h) {
        this.body = Matter.Bodies.rectangle(x, y, w, h, {frictionAir: 0.1});
        this._origX = x;
        this._origY = y;
        this.ref = elem;
    }

    updatePosition() {
        if(this.body.isSleeping)
            return;

        const elem = this.ref;
        const dx = this.body.position.x - this._origX;
        const dy = this.body.position.y - this._origY;
        
        elem.style.transform = `translate(${dx}px, ${dy}px)`;
    }
}

export default DOMBody;