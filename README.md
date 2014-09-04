#ijeomamotion-js
 
A Javascript library (which supports p5.js) for sketching animations. Ijeoma means safe journey in Igbo, the language of my family from Nigeria. I started writing this a while back in Java for Processing then ported it to JS for processing.js and recently I've rewrote it for JS and p5.js.

#Download 
Developement
https://raw.githubusercontent.com/ekeneijeoma/ijeomamotion-js/master/build/ijeomamotion.js
Production
https://raw.githubusercontent.com/ekeneijeoma/ijeomamotion-js/master/build/ijeomamotion.min.js

#Getting Started 
##How to create Tweens

###Numbers  
There are 4 ways to setup Tweens for numbers.
```javascript
new Tween(duration,delay,easing) //object defaults to window
new Tween(object, duration, delay, easing) 
new Tween(object, property, end, duration, delay, easing)
new Tween(property, end, duration, delay, easing) //object defaults to window
```

Say you want to tween x from 0 to 100 in 100 frames. 
```javascript
var x = 0;
var t = new Tween(100).add("x", 100, 100).play();
```
or
```javascript
var x = 0;
var t = new Tween(this,100).add("x", 100).play();
```

or
```javascript
var x = 0;
var t = new Tween(this, "x", 100, 100).play();
```

The 2nd way lets you chain/add more properties to the Tween. Say we want to tween a var x from 0 to 100 and var y from 0 to 100 in 100 frames.
```javascript
var t = new Tween(this).add("x", 100).add("y", 100).play();
```
 
###p5.Colors 
Say we want to tween a color var c from black to white in 100 frames.
```javascript
var c = color(0);
var t = new Tween("c", color(255), 100).play();
```
 
###p5.Vectors
You can also tween PVectors. Say we want to tween PVectors `v1 = PVector(0,0)` and `v2 = PVector(0,0)` to `v1 = PVector(50, 50)` and `v2 = PVector(100, 100)`.
```javascript
var v = createVector(0,0);
var t = new Tween("v", createVector(100,100), 100).play();
```

###All in 1!
You can also tween multiples properties of any type in 1 Tween.
```javascript
var t = new Tween(100).add("x", 100).add("c", color(255)).add("v", createVector(100, 100)).play();
```

###Callbacks 
```javascript
t = new Tween(100).onStart(func).onUpdate(func).onEnd(func).play(); 
```

##How to playback Tweens 
###Delaying
```javascript
t = new Tween("w", width, 50, 50).play();
```
or
```javascript
t = new Tween(this,50,50).add("w", width).delay(50).play();
```
###Pausing, Resuming  
```javascript  
  t.pause(); 
  t.resume(); 
  t.seek(time); 
```
###Repeating
```javascript
var t = new Tween("w", width, 100).repeat().play();
```
###Reversing
```javascript 
var t = new Tween("w", width, 100).repeat().reverse().play();
```

##How to playback tweens in parallel
```javascript
Parallel p = new Parallel()
  .add(new Tween("x1", width, 100))
  .add(new Tween("x2", -width, 200))
  .play(); 
```

##How to playback tweens in a sequence
```javascript
Sequence s = new Sequence()
  .add(new Tween(100).add("x1", width).add("c1", color(0))
  .add(new Tween(75).add("x2", width).add("c2", color(0))
  .add(new Tween(50).add("x3", width).add("c3", color(0))
  .add(new Tween(25).add("x4", width).add("c4", color(0))
  .repeat()
  .play();
```

##How to playback tweens in a timeline
```javascript
Timeline t = new Timeline()
  .add(new Tween(50).add("y1",  height).add("c1", color(0))
  .add(new Tween(50).add("y2", -height).add("c2", color(0))
  .add(new Tween(50).add("y3",  height).add("c3", color(0))
  .add(new Tween(50).add("y4", -height).add("c4", color(0))
  .add(new Tween(50).add("y5",  height).add("c5", color(0))
  .repeat()
  .play();
```