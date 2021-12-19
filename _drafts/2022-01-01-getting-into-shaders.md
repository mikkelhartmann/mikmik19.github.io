---
layout: post
title: "Getting Into: Shaders"
date: 2021-01-24 12:00:36 +0200
---

I want to understand shaders.

The first thing I like to do is find a simple example, copy it, deconstruct it and change it. The first shader should be simple and have no animation.


The shader below has animation. I got it from [this jsfiddle](https://jsfiddle.net/wilt/y7dn5co6/) by [Wilt](https://jsfiddle.net/user/wilt/fiddles/). 

<div id="container"></div>

Let's go over it. Since we are workin in 3D, the first thing we need is a point of view -- the camera:

```javascript
camera = new THREE.Camera();
camera.position.z = 1;
```

We create a camera and set the z postion to 1. The default values is (x,y,z) = (0,0,0). The documentation says "you probably want a PerspectiveCamera or OrthographicCamera instead." But let's roll with it anyway. The next thing we need is a place to put things, like a scene:

```javascript
scene = new THREE.Scene();
```

The next part is less obvious:

```javascript
uniforms = {
	time: { type: "f", value: 1.0 },
	resolution: { type: "v2", value: new THREE.Vector2() }
};
uniforms.resolution.value.x = width;
uniforms.resolution.value.y = height;
```

We define an object called unifors and set some properties. The resolution will be used to set the dimensions of the screen. 

```javascript
material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: document.getElementById('vertexShader').textContent,
	fragmentShader: document.getElementById('fragmentShader').textContent
});
```

Here we are using the uniforms. We are also setting two shaders. The information for the shadering is grabbed from two script tags in the page.

<script id="vertexShader" type="x-shader/x-vertex">
	uniform float time;
	uniform vec2 resolution;
	void main()	{
		gl_Position = vec4( position, 1.0 );
	}
</script>

<script id="fragmentShader" type="x-shader/x-fragment">
	uniform float time;
	uniform vec2 resolution;
	void main()	{
		float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
		float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
		gl_FragColor = vec4(vec3(min(x, y)), 1.);
	}
</script>

<script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.min.js"></script>
<script type='text/javascript'  src='/js/shaders/shader-example.js'></script>