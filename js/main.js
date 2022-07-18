import Matter from 'matter-js';
import Hammer from 'hammerjs';
import DOMBody from './DOMBody';

// blast dom into .blast spans
var blasted = $('p').blast({ delimiter: "word" }).toArray();

// create Matter.js new engine
var engine = Matter.Engine.create();

// create bodies for each element
var domBodies = blastedToDomBodies(blasted);
Matter.World.add(engine.world, domBodies.map(it => it.body));

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
  domBodies.forEach(body => body.updatePosition());
  requestAnimationFrame(step);
}
step();

// start physics engine
engine.world.gravity.scale = 0.000000000001;
Matter.Engine.run(engine);


function blastedToDomBodies(elements) {
  return elements.map((elem) => DOMBody.fromElement(elem));
}

function onTouchMove(f) {
  var hammertime = self.__hammertime || (self.__hammertime = new Hammer(document.body));
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on('pan', f);
}
