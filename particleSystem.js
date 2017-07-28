
var firefliesSettings = {
	type: "fireflies",
	maxParticles: 200,
	particles: [],
	particleAreaWidth: 25,
	particleWidth: 0.2,
	particlesMaxX: 25,
	particlesMaxY: 5,
	particlesMaxZ: 25,
	rate: 0,
	rateLimiter: 50
};

var wandSettings = {
	type: "wand",
	maxParticles: 200,
	particles: [],
	particleAreaWidth: 0.5,
	particleWidth: 0.2,
	particlesMaxX: 3,
	particlesMaxY: 3,
	particlesMaxZ: 3,
	rate: 0,
	rateLimiter: 50,
};

var particleVertexPositionBuffer;
var particleVertexNormalBuffer;
var particleVertexTextureCoordBuffer;

function fillFirefliesParticles() {
	firefliesSettings.rate = (firefliesSettings.rate+1)%(firefliesSettings.rateLimiter+1);

	if (firefliesSettings.particles.length < firefliesSettings.maxParticles && firefliesSettings.rate == firefliesSettings.rateLimiter) {

		var particle = {
			yVelocity: myLib.random(0.0001, 0.001),
			xVelocity: myLib.random(-0.001, 0.001),
			zVelocity: myLib.random(-0.001, 0.001),
			pos: {x:(myLib.random(0, firefliesSettings.particleAreaWidth - firefliesSettings.particleWidth) - (firefliesSettings.particleAreaWidth/2)), y:myLib.random(0, 3.0), z:(myLib.random(0, firefliesSettings.particleAreaWidth - firefliesSettings.particleWidth) - (firefliesSettings.particleAreaWidth/2))},
			size: {width:myLib.random(0, firefliesSettings.particleWidth), height:myLib.random(0, firefliesSettings.particleWidth)},
			color: {r:0.0, g:1.0, b:0.0, a: 1.0},
			fireflyColorDirection: -1,
			fireflyWaiter: 0,
			fireflyWait: false,
		};

		firefliesSettings.particles.push(particle);
	}
}

function fillWandParticles() {
	wandSettings.rate = (wandSettings.rate+1)%(wandSettings.rateLimiter+1);

	if (wandSettings.particles.length < wandSettings.maxParticles && wandSettings.rate == wandSettings.rateLimiter) {

		var particle = {
			velocity: myLib.random(2, 3),
			diameter: myLib.random(wandSettings.particleAreaWidth, wandSettings.particleAreaWidth+0.4),
			pos: {x:(myLib.random(0, wandSettings.particleAreaWidth - wandSettings.particleWidth) - (wandSettings.particleAreaWidth/2)), y:0.0, z:(myLib.random(0, wandSettings.particleAreaWidth - wandSettings.particleWidth) - (wandSettings.particleAreaWidth/2))},
			size: {width:myLib.random(0, wandSettings.particleWidth), height:myLib.random(0, wandSettings.particleWidth)},
			color: {r:1.0, g:1.0, b:1.0, a: 1.0},
			angle: 0.0
		};

		wandSettings.particles.push(particle);
	}
}

var fireflyColor = {r:0.0, g:1.0, b:0.0, a: 1.0};
var fireflyColorDirection = -1;
var fireflyWaiter = 0;
var fireflyWait = false;
function setPosition(particleSettingsObj) {
	for (var i = 0; i < particleSettingsObj.particles.length; i++) {

		if(particleSettingsObj.type == "wand") {
			particleSettingsObj.particles[i].pos.x = particleSettingsObj.particles[i].diameter * Math.cos(myLib.degToRad(particleSettingsObj.particles[i].angle));
			particleSettingsObj.particles[i].pos.y += particleSettingsObj.particles[i].velocity * myLib.random(0.005, 0.001);
			particleSettingsObj.particles[i].pos.z = particleSettingsObj.particles[i].diameter * Math.sin(myLib.degToRad(particleSettingsObj.particles[i].angle));
			particleSettingsObj.particles[i].angle = (particleSettingsObj.particles[i].angle+particleSettingsObj.particles[i].velocity)%360;
		} else {

			if((particleSettingsObj.particles[i].color["g"] <= 0.0 && particleSettingsObj.particles[i].fireflyColorDirection == -1) || (particleSettingsObj.particles[i].color["g"] >= 1.0 && particleSettingsObj.particles[i].fireflyColorDirection == 1)) {
				if(particleSettingsObj.particles[i].fireflyWaiter < 100) {
					particleSettingsObj.particles[i].fireflyWait = true;
					particleSettingsObj.particles[i].fireflyWaiter++;
				} else {
					particleSettingsObj.particles[i].fireflyWait = false;
					particleSettingsObj.particles[i].fireflyWaiter = 0;
					particleSettingsObj.particles[i].fireflyColorDirection *= -1;
				}
			}

			particleSettingsObj.particles[i].pos.x += particleSettingsObj.particles[i].xVelocity;
			particleSettingsObj.particles[i].pos.y += particleSettingsObj.particles[i].yVelocity;
			particleSettingsObj.particles[i].pos.z += particleSettingsObj.particles[i].zVelocity;

			if(!particleSettingsObj.particles[i].fireflyWait) {
				particleSettingsObj.particles[i].color["g"] += 0.01*particleSettingsObj.particles[i].fireflyColorDirection;
				particleSettingsObj.particles[i].color["a"] += 0.01*particleSettingsObj.particles[i].fireflyColorDirection;
			}			
		}

		if (particleSettingsObj.particles[i].pos.x > particleSettingsObj.particlesMaxX || particleSettingsObj.particles[i].pos.y > particleSettingsObj.particlesMaxY || particleSettingsObj.particles[i].pos.z > particleSettingsObj.particlesMaxZ)
			particleSettingsObj.particles[i] = null;
	}

	particleSettingsObj.particles = myLib.cleanArray(particleSettingsObj.particles);
}

function drawParticles(type) {
	var activeSetting;
	var activeTexture;
	if(type == "fireflies") {
		fillFirefliesParticles();
		activeSetting = firefliesSettings;
		activeTexture = firefliesParticleTexture;
		
	} else if(type == "wand") {
		fillWandParticles();
		activeSetting = wandSettings;
		activeTexture = wandParticleTexture;
	}

	setPosition(activeSetting);

	gl.uniform1i(shaderProgram.useColorUniform, true);
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

	var index = 0;
	var normalIndex = 0;
	var colorIndex = 0;
	var textureIndex = 0;
	positionArray = [];
	colorArray = [];
	normalArray = [];
	textureCoordinates = [];

	for (var i = 0; i < activeSetting.particles.length; i++) {
		var x1 = activeSetting.particles[i].pos.x - activeSetting.particleWidth/2;
		var x2 = activeSetting.particles[i].pos.x + activeSetting.particleWidth/2;
		var y1 = activeSetting.particles[i].pos.y - activeSetting.particleWidth/2;
		var y2 = activeSetting.particles[i].pos.y + activeSetting.particleWidth/2;

		index = myLib.insertAt(index, positionArray, [
			x1, y1, activeSetting.particles[i].pos.z,
			x2, y1, activeSetting.particles[i].pos.z,
			x1, y2, activeSetting.particles[i].pos.z,
			x2, y1, activeSetting.particles[i].pos.z,
			x1, y2, activeSetting.particles[i].pos.z,
			x2, y2, activeSetting.particles[i].pos.z
		]);

		normalIndex = myLib.insertAt(index, normalArray, [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		]);

		textureIndex = myLib.insertAt(textureIndex, textureCoordinates, [
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 1.0
		]);

		for (var ii = 0; ii < 6; ii++) {
			colorIndex = myLib.insertAt(colorIndex, colorArray, [
				activeSetting.particles[i].color.r,
				activeSetting.particles[i].color.g,
				activeSetting.particles[i].color.b,
				activeSetting.particles[i].color.a
			]);
		}
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, particleVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionArray), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, particleVertexNormalBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalArray), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, particleVertexColorBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, particleVertexTextureCoordBuffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, activeTexture);
	gl.uniform1i(shaderProgram.samplerUniform, 0);

	setMatrixUniforms();
	gl.drawArrays(gl.TRIANGLES, 0, activeSetting.particles.length*6);

	gl.uniform1f(shaderProgram.alphaUniform, 1.0);
	gl.uniform1i(shaderProgram.useColorUniform, false);
	gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
}