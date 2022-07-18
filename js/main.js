// blast dom into .blast spans
var blasted = $('p').blast({ delimiter: "word" }).toArray();

// create Matter.js new engine
var engine = Matter.Engine.create();

// create bodies for each element
var bodies = blastedToBodies(blasted);
Matter.World.add(engine.world, bodies);

// create mouseBody for "touching away" and colliding with other bodies
var mouseBody = Matter.Bodies.circle(0, 0, 30, {isStatic: true});
Matter.World.add(engine.world, mouseBody);

onTouchMove((e) => {
  Matter.Body.setPosition(mouseBody, Matter.Vector.create(e.center.x, e.center.y));
  if(e.pointerType != 'mouse') {
  }
});

//
// Matter.Events.on(engine, 'afterUpdate', function() {
//   transformElementsFrom(bodies);
// });
function step() {
  transformElementsFrom(bodies);
  requestAnimationFrame(step);
}
step();

// start physics engine
engine.world.gravity.scale = 0.000000000001;
Matter.Engine.run(engine);


function blastedToBodies(elements) {
  return elements.map(function(elem) {
    var $elem = $(elem);
    var left = $elem.offset().left;
    var top = $elem.offset().top;
    var w = $elem.width();
    var h = $elem.height();
    var x = left + w/2; // Matter.js uses center-origin shapes
    var y = top + h/2;
    var body = Matter.Bodies.rectangle(x, y, w, h, {frictionAir: 0.1});
    body.origX = x; // save initial position
    body.origY = y;
    body.ref = elem; // keep a reference to the DOM element to transform it
    return body;
  });
}

function onTouchMove(f) {
  var hammertime = this.__hammertime || (this.__hammertime = new Hammer(document.body));
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on('pan', f);
}

function transformElementsFrom(bodies) {
  bodies.forEach(function(body) {
    if(body.isSleeping)
      return;

    var elem = body.ref;
    var dx = body.position.x - body.origX;
    var dy = body.position.y - body.origY;
    
    elem.style.transform = `translate(${dx}px, ${dy}px)`;
  });
}
