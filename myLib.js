var myLib = new function() {

	this.mvMatrixStack = [];

	this.mvPushMatrix = function() {
		var copy = myLib.create();
		myLib.set(mvMatrix, copy);
		this.mvMatrixStack.push(copy);
	}

	this.mvPopMatrix = function() {
		if (this.mvMatrixStack.length == 0)
			throw "Invalid popMatrix!";
		mvMatrix = this.mvMatrixStack.pop();
	}

	this.degToRad = function (degrees) {
	    return degrees * Math.PI / 180;
	};

	this.shear = function (m, deg, arr) {
		var c = 1/Math.tan(deg);
		if(arr[0] == 1) {
			this.multiply(m, [	1, c, 0, 0,
				 		 		0, 1, 0, 0,
					 	 		0, 0, 1, 0,
						 		0, 0, 0, 1]);
		}
		if(arr[1] == 1) {
			this.multiply(m, [	1, 0, 0, 0,
						 		c, 1, 0, 0,
							 	0, 0, 1, 0,
								0, 0, 0, 1]);
		}
		if(arr[2] == 1) {
			this.multiply(m, [	1, 0, 0, 0,
				 		 		0, 1, 0, 0,
							 	0, c, 1, 0,
								0, 0, 0, 1]);
		}
		
	};

	this.rotate = function (m, deg, arr) {
		var s = Math.sin(deg);
		var c = Math.cos(deg);
		if(arr[0] == 1) {
			this.multiply(m, this.transpose([	 1, 0, 0, 0,
								 	    		 0, c, s, 0,
									    		 0,-s, c, 0,
								 	    		 0, 0, 0, 1]));	
		}
		if(arr[1] == 1) {
			this.multiply(m, this.transpose([  	 c, 0, s, 0,
							 		  			 0, 1, 0, 0,
								 	   			-s, 0, c, 0,
							 	 	  			 0, 0, 0, 1]));
		}
		if(arr[2] == 1) {
			this.multiply(m, this.transpose([	 c,-s, 0, 0,
								 	 			 s, c, 0, 0,
									 			 0, 0, 1, 0,
								 	 			 0, 0, 0, 1]));
		}
	};

	this.translate = function (m, arr) {
		this.multiply(m, this.transpose([	1, 0, 0, arr[0],
								 	 		0, 1, 0, arr[1],
								 	  		0, 0, 1, arr[2],
								 	  		0, 0, 0, 1]));
	};

	this.transpose = function (m) {
		var result = this.create();
		for(var i = 0; i<m.length; i++) {
			result[Math.floor(i/4)+((i%4)*4)] = m[i];
		}
		return result;
	};

	this.multiply = function (mat, 	arr) {
		var result = new Array();
		for(var i = 0; i< mat.length; i++) {
			var sumOfProducts = 0;
			for (var e = 0; e < 4; e++)
				sumOfProducts += arr[(Math.floor(i/4)*4)+e]*mat[i%4+(e*4)];
			result[i] = sumOfProducts;
		}
		for(var i = 0; i<result.length; i++)
			mat[i] = result[i];
	};

	this.identity = function(m) {
		for(var i = 0; i<m.length; i++)
			m[i] = 0;
		m[0] = 1;
		m[5] = 1;
		m[10] = 1;
		m[15] = 1;
	};

	this.create = function (m) {
		var a = new glMatrixArrayType(16);
		if(m){
			for(var i = 0; i<16; i++)
				a[i] = m[i];
		}
		return a;
	};

	this.set = function(m, c) {
		for (var i = 0; i < c.length; i++)
			c[i] = m[i];
		return c;
	};

	this.scale = function (m, s) {
		this.multiply(	m, 
					   [s, 0, 0, 0,
					 	0, s, 0, 0, 
					 	0, 0, s, 0, 
					 	0, 0, 0, 1])
	};

	this.ortho = function(left, right, bottom, top, near, far){
		return [
				// Column 01
				2/(right-left), 0, 0, 0,
				// Column 02
				0, 2/(top-bottom), 0, 0,
				// Column 03
				0, 0, -2/(far-near), 0,
				// Column 03
				-(left+right)/(right-left),
				-(top+bottom)/(top-bottom),
				-(far+near)/(far-near),
				1
		];
	};

	this.perspective = function(fov, aspect, near, far) {
		var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
		var rangeInv = 1.0 / (near - far);

		return [
				f / aspect, 0, 0, 0,
				0, f, 0, 0,
				0, 0, (near + far) * rangeInv, -1,
				0, 0, near * far * rangeInv * 2, 0
			   ];

	}

	this.oblique = function(left, right, bottom, top, near, far, theta, phi){

	    var cotTheta = -1/Math.tan(this.degToRad(theta));
	    var cotPhi = -1/Math.tan(this.degToRad(phi));

	    var ortho = this.ortho(left, right, bottom, top, near, far);

	 	var m = [
	 				1, 0, 0, 0,
	 				0, 1, 0, 0,
	 				cotTheta, cotPhi, 1, 0,
	 				0, 0, 0, 1
	 	];

	    ortho = this.transpose(ortho);
	   	this.multiply(m, ortho);

		return m;

	};

	this.getEuclidean = function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
	};

	this.random = function (min, max) {
		return (Math.random()*(max-min))+min;
	};

	this.insertAt = function (index,arr1,arr2) {
		for (var i = 0; i < arr2.length; i++)
			arr1[index++] = arr2[i];
		return index;
	};

	this.cleanArray = function(array) {
		for (var i = 0, a = 0; i < array.length; i++)
		if (array[i] !== null)
		  array[a++] = array[i];
		return array.slice(0, a);
	};
}
