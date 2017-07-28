
var leafVertexPositionBuffer;
var leafVertexTextureCoordBuffer;
var leafVertexIndexBuffer;

var trunkVertexPositionBuffer;
var trunkVertexNormalBuffer;
var trunkVertexTextureCoordBuffer;
var trunkVertexIndexBuffer;

var floorVertexPositionBuffer;
var floorVertexNormalBuffer;
var floorVertexTextureCoordBuffer;
var floorVertexIndexBuffer;

var pedestalVertexPositionBuffer;
var pedestalVertexTextureCoordBuffer;
var pedestalVertexIndexBuffer;

var wandVertexPositionBuffer;
var wandVertexTextureCoordBuffer;
var wandVertexIndexBuffer;

var wallOneVertexPositionBuffer;
var wallOneVertexTextureCoordBuffer;
var wallOneVertexIndexBuffer;

var wallTwoVertexPositionBuffer;
var wallTwoVertexTextureCoordBuffer;
var wallTwoVertexIndexBuffer;

var wallThreeVertexPositionBuffer;
var wallThreeVertexTextureCoordBuffer;
var wallThreeVertexIndexBuffer;

var wallFourVertexPositionBuffer;
var wallFourVertexTextureCoordBuffer;
var wallFourVertexIndexBuffer;

var posterVertexPositionBuffer;
var posterVertexTextureCoordBuffer;
var posterVertexIndexBuffer;

var particleVertexPositionBuffer;
var particleVertexNormalBuffer;
var particleVertexTextureCoordBuffer;
var particleVertexColorBuffer;

function initBuffers () {

	// Leaf Position
	leafVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer (gl.ARRAY_BUFFER, leafVertexPositionBuffer);
	var vertices = [
		// Front face
         0.0,  1.0,  0.0,
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
        // Right face
         0.0,  1.0,  0.0,
         1.0, -1.0,  1.0,
         1.0, -1.0, -1.0,
        // Back face
         0.0,  1.0,  0.0,
         1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        // Left face
         0.0,  1.0,  0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        // Bottom face
         1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0, -1.0,
	];
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
	leafVertexPositionBuffer.itemSize = 3;
	leafVertexPositionBuffer.numItems = 16;

	// Leaf Textures
	leafVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, leafVertexTextureCoordBuffer);
  var textureCoords = [
	      // Front face
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Right face
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Back face
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Left face
        0.5, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Bottom face
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0,
        1.0, 1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  leafVertexTextureCoordBuffer.itemSize = 2;
  leafVertexTextureCoordBuffer.numItems = 16;

  // Leaf Indices
  leafVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, leafVertexIndexBuffer);
	var leafVertexIndices = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11,
        12, 13, 14,
        12, 13, 15,
  ];
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(leafVertexIndices), gl.STATIC_DRAW);
	leafVertexIndexBuffer.itemSize = 1;
	leafVertexIndexBuffer.numItems = 18;

	// Trunk Position
	trunkVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer (gl.ARRAY_BUFFER, trunkVertexPositionBuffer);
	var vertices = [
		// Front face
      -0.5, -2.0,  0.5,
       0.5, -2.0,  0.5,
       0.5,  2.0,  0.5,
      -0.5,  2.0,  0.5,

      // Back face
      -0.5, -2.0, -0.5,
      -0.5,  2.0, -0.5,
       0.5,  2.0, -0.5,
       0.5, -2.0, -0.5,

      // Top face
      -0.5,  0.5, -0.5,
      -0.5,  0.5,  0.5,
       0.5,  0.5,  0.5,
       0.5,  0.5, -0.5,

      // Bottom face
      -0.5, -0.5, -0.5,
       0.5, -0.5, -0.5,
       0.5, -0.5,  0.5,
      -0.5, -0.5,  0.5,

      // Right face
       0.5, -2.0, -0.5,
       0.5,  2.0, -0.5,
       0.5,  2.0,  0.5,
       0.5, -2.0,  0.5,

      // Left face
      -0.5, -2.0, -0.5,
      -0.5, -2.0,  0.5,
      -0.5,  2.0,  0.5,
      -0.5,  2.0, -0.5
	];
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
	trunkVertexPositionBuffer.itemSize = 3;
	trunkVertexPositionBuffer.numItems = 24;

  // Trunk Normals
	trunkVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, trunkVertexNormalBuffer);
	var vertexNormals = [
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,

		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,
		0.0, 0.0, -1.0,

		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,

		0.0, -1.0, 0.0,
		0.0, -1.0, 0.0,
		0.0, -1.0, 0.0,
		0.0, -1.0, 0.0,

		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,

		-1.0, 0.0, 0.0,
		-1.0, 0.0, 0.0,
		-1.0, 0.0, 0.0,
		-1.0, 0.0, 0.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
	trunkVertexNormalBuffer.itemSize = 3;
	trunkVertexNormalBuffer.numItems = 24;

	//Trunk Textures
	trunkVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trunkVertexTextureCoordBuffer);
    var textureCoords = [
	      // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          // Back face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          // Top face
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          // Bottom face
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          // Right face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          // Left face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    trunkVertexTextureCoordBuffer.itemSize = 2;
    trunkVertexTextureCoordBuffer.numItems = 24;

    // Trunk Indices
    trunkVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trunkVertexIndexBuffer);
    var trunkVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(trunkVertexIndices), gl.STATIC_DRAW);
    trunkVertexIndexBuffer.itemSize = 1;
    trunkVertexIndexBuffer.numItems = 36;

    // Floor Position
    floorVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);
    vertices = [
        // Bottom face
        -100.0, -2.0, -100.0,
         100.0, -2.0, -100.0,
         100.0, -2.0,  100.0,
        -100.0, -2.0,  100.0,

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    floorVertexPositionBuffer.itemSize = 3;
    floorVertexPositionBuffer.numItems = 4;

    // Floor Normals
    floorVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexNormalBuffer);
    var vertexNormals = [
    	0.0, 1.0, 0.0,
    	0.0, 1.0, 0.0,
    	0.0, 1.0, 0.0,
    	0.0, 1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    floorVertexNormalBuffer.itemSize = 3;
    floorVertexNormalBuffer.numItems = 4;

    // Floor Textures
    floorVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexTextureCoordBuffer);
    var textureCoords = [
          // Bottom face
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    floorVertexTextureCoordBuffer.itemSize = 2;
    floorVertexTextureCoordBuffer.numItems = 4;
    
    // Floor Indices
  	floorVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVertexIndexBuffer);
    var floorVertexIndices = [
        0, 1, 2,      0, 2, 3
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(floorVertexIndices), gl.STATIC_DRAW);
    floorVertexIndexBuffer.itemSize = 1;
    floorVertexIndexBuffer.numItems = 6;

    // WallOne Position
    wallOneVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallOneVertexPositionBuffer);
    vertices = [
        // Right face
         70.0, -2.0, 70.0,
         70.0, -2.0, -70.0,
         70.0, 48.0,  70.0,
         70.0, 48.0,  -70.0,

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    wallOneVertexPositionBuffer.itemSize = 3;
    wallOneVertexPositionBuffer.numItems = 4;

    // WallOne Textures
    wallOneVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallOneVertexTextureCoordBuffer);
    var textureCoords = [
        // Front face
          1.0, 0.0,
          0.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wallOneVertexTextureCoordBuffer.itemSize = 2;
    wallOneVertexTextureCoordBuffer.numItems = 4;
    
    // WallOne Indices
  	wallOneVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallOneVertexIndexBuffer);
    var wallOneVertexIndices = [
          0, 1, 2,      1, 2, 3
      ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wallOneVertexIndices), gl.STATIC_DRAW);
    wallOneVertexIndexBuffer.itemSize = 1;
    wallOneVertexIndexBuffer.numItems = 6;

    // WallTwo Position
    wallTwoVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallTwoVertexPositionBuffer);
    vertices = [
        // Front face
        -70.0, -2.0, -70.0,
         70.0, -2.0, -70.0,
         70.0, 48.0,  -70.0,
        -70.0, 48.0,  -70.0,

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    wallTwoVertexPositionBuffer.itemSize = 3;
    wallTwoVertexPositionBuffer.numItems = 4;

    // WallTwo Textures
    wallTwoVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallTwoVertexTextureCoordBuffer);
    var textureCoords = [
          // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wallTwoVertexTextureCoordBuffer.itemSize = 2;
    wallTwoVertexTextureCoordBuffer.numItems = 4;
    
    // WallTwo Indices
  	wallTwoVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallTwoVertexIndexBuffer);
    var wallTwoVertexIndices = [
          0, 1, 2,      0, 2, 3
      ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wallTwoVertexIndices), gl.STATIC_DRAW);
    wallTwoVertexIndexBuffer.itemSize = 1;
    wallTwoVertexIndexBuffer.numItems = 6;

    // WallThree Position
    wallThreeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallThreeVertexPositionBuffer);
    vertices = [
        // Front face
         -70.0, -2.0, 70.0,
         -70.0, -2.0, -70.0,
         -70.0, 48.0,  70.0,
         -70.0, 48.0,  -70.0,

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    wallThreeVertexPositionBuffer.itemSize = 3;
    wallThreeVertexPositionBuffer.numItems = 4;

    // WallThree Textures
    wallThreeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallThreeVertexTextureCoordBuffer);
    var textureCoords = [
          // Front face
          0.0, 0.0,
          1.0, 0.0,
          0.0, 1.0,
          1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wallThreeVertexTextureCoordBuffer.itemSize = 2;
    wallThreeVertexTextureCoordBuffer.numItems = 4;
    
    // WallThree Indices
  	wallThreeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallThreeVertexIndexBuffer);
    var wallThreeVertexIndices = [
        0, 1, 2,      1	, 2, 3
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wallThreeVertexIndices), gl.STATIC_DRAW);
    wallThreeVertexIndexBuffer.itemSize = 1;
    wallThreeVertexIndexBuffer.numItems = 6;

    // WallFour
    wallFourVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallFourVertexPositionBuffer);
    vertices = [
        // Front face
        -70.0, -2.0, 70.0,
         70.0, -2.0, 70.0,
         70.0, 48.0, 70.0,
        -70.0, 48.0, 70.0,

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    wallFourVertexPositionBuffer.itemSize = 3;
    wallFourVertexPositionBuffer.numItems = 4;

    // WallFour Textures
    wallFourVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallFourVertexTextureCoordBuffer);
    var textureCoords = [
          // Front face
          1.0, 0.0,
          0.0, 0.0,
          0.0, 1.0,
          1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wallFourVertexTextureCoordBuffer.itemSize = 2;
    wallFourVertexTextureCoordBuffer.numItems = 4;
    
    // WallFour Indices
  	wallFourVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallFourVertexIndexBuffer);
    var wallFourVertexIndices = [
          0, 1, 2,      0, 2, 3
      ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wallFourVertexIndices), gl.STATIC_DRAW);
    wallFourVertexIndexBuffer.itemSize = 1;
    wallFourVertexIndexBuffer.numItems = 6;

    // Pedestal Position
    pedestalVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer (gl.ARRAY_BUFFER, pedestalVertexPositionBuffer);
    var vertices = [
    	// Front face
        -0.5,  0,  0.5,
         0.5,  0,  0.5,
         0.5,  2,  0.5,
        -0.5,  2,  0.5,

        // Back face
        -0.5,  0, -0.5,
        -0.5,  2, -0.5,
         0.5,  2, -0.5,
         0.5,  0, -0.5,

        // Top face
        -0.5,  2, -0.5,
        -0.5,  2,  0.5,
         0.5,  2,  0.5,
         0.5,  2, -0.5,

        // Bottom face
        -0.5, 0, -0.5,
         0.5, 0, -0.5,
         0.5, 0,  0.5,
        -0.5, 0,  0.5,

        // Right face
         0.5,  0, -0.5,
         0.5,  2, -0.5,
         0.5,  2,  0.5,
         0.5,  0,  0.5,

        // Left face
        -0.5,  0, -0.5,
        -0.5,  0,  0.5,
        -0.5,  2,  0.5,
        -0.5,  2, -0.5
    ];
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
    pedestalVertexPositionBuffer.itemSize = 3;
    pedestalVertexPositionBuffer.numItems = 24;

    //Pedestal Textures
    pedestalVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pedestalVertexTextureCoordBuffer);
    var textureCoords = [
	      // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          // Back face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          // Top face
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          // Bottom face
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          // Right face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          // Left face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    pedestalVertexTextureCoordBuffer.itemSize = 2;
    pedestalVertexTextureCoordBuffer.numItems = 24;

    // Pedestal Indices
    pedestalVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pedestalVertexIndexBuffer);
    var pedestalVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pedestalVertexIndices), gl.STATIC_DRAW);
    pedestalVertexIndexBuffer.itemSize = 1;
    pedestalVertexIndexBuffer.numItems = 36;
    
    // Wand Position
    wandVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer (gl.ARRAY_BUFFER, wandVertexPositionBuffer);
    var vertices = [
    	// Front face
        -0.03,  0.0,  0.03,
         0.03,  0.0,  0.03,
         0.03,  1.0,  0.03,
        -0.03,  1.0,  0.03,

        // Back face
        -0.03,  0.0, -0.03,
        -0.03,  1.0, -0.03,
         0.03,  1.0, -0.03,
         0.03,  0.0, -0.03,

        // Top face
        -0.03,  1.0, -0.03,
        -0.03,  1.0,  0.03,
         0.03,  1.0,  0.03,
         0.03,  1.0, -0.03,

        // Bottom face
        -0.03, 0, -0.03,
         0.03, 0, -0.03,
         0.03, 0,  0.03,
        -0.03, 0,  0.03,

        // Right face
         0.03,  0.0, -0.03,
         0.03,  1.0, -0.03,
         0.03,  1.0,  0.03,
         0.03,  0.0,  0.03,

        // Left face
        -0.03,  0.0, -0.03,
        -0.03,  0.0,  0.03,
        -0.03,  1.0,  0.03,
        -0.03,  1.0, -0.03
    ];
    gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vertices), gl.STATIC_DRAW);
    wandVertexPositionBuffer.itemSize = 3;
    wandVertexPositionBuffer.numItems = 24;

    //Wand Textures
    wandVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wandVertexTextureCoordBuffer);
    var textureCoords = [
	      // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          // Back face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          // Top face
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          // Bottom face
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          // Right face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          // Left face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    wandVertexTextureCoordBuffer.itemSize = 2;
    wandVertexTextureCoordBuffer.numItems = 24;

    // Wand Indices
    wandVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wandVertexIndexBuffer);
    var wandVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(wandVertexIndices), gl.STATIC_DRAW);
    wandVertexIndexBuffer.itemSize = 1;
    wandVertexIndexBuffer.numItems = 36;

    // Poster Position
    posterVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posterVertexPositionBuffer);
    vertices = [
        // Front face
        0.0, -2.0, 0.0,
        1.0, -2.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, 0.0,

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    posterVertexPositionBuffer.itemSize = 3;
    posterVertexPositionBuffer.numItems = 4;

    // Poster Textures
    posterVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posterVertexTextureCoordBuffer);
    var textureCoords = [
          // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    posterVertexTextureCoordBuffer.itemSize = 2;
    posterVertexTextureCoordBuffer.numItems = 4;
    
    // Poster Indices
  	posterVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, posterVertexIndexBuffer);
    var posterVertexIndices = [
          0, 1, 2,      0, 2, 3
      ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(posterVertexIndices), gl.STATIC_DRAW);
    posterVertexIndexBuffer.itemSize = 1;
    posterVertexIndexBuffer.numItems = 6;

    particleVertexPositionBuffer = gl.createBuffer();
    particleVertexNormalBuffer = gl.createBuffer();
    particleVertexTextureCoordBuffer = gl.createBuffer();
    particleVertexColorBuffer = gl.createBuffer();

}