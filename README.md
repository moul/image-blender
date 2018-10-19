Image blender
=============

[![GuardRails badge](https://badges.production.guardrails.io/moul/image-blender.svg)](https://www.guardrails.io)

Blends images together

Demo
----

http://moul.github.com/image-blender/

Example
-------

1 image

<img src="http://c387484.r84.cf1.rackcdn.com//s/Screen%20Shot%202012-08-12%20at%205.58.37%20PM.png" />

2 images

<img src="http://c387484.r84.cf1.rackcdn.com//s/Screen%20Shot%202012-08-12%20at%205.58.43%20PM.png" />

3 images

<img src="http://c387484.r84.cf1.rackcdn.com//s/Screen%20Shot%202012-08-12%20at%205.58.46%20PM.png" />

16 images

<img src="http://c387484.r84.cf1.rackcdn.com//s/Screen%20Shot%202012-08-12%20at%205.57.27%20PM.png" />

105 images

<img src="http://c387484.r84.cf1.rackcdn.com//s/Screen%20Shot%202012-08-12%20at%205.57.31%20PM.png" />

How to use it
-------------

HTML

```html
<canvas id="container"></div>
<img src="image1.jpg" />
<img src="image2.jpg" />
```

Javascript

```javascript
//Initialization

ImageBlender.init({
  canvas: $('#container'),
  sleepTime: 100
});

// adding images
$('img').load(function() {
  ImageBlender.call(this);
});
```
