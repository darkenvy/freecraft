var voxel = require('voxel');
var createGame = require('voxel-engine')
var createPlayer = require('voxel-player')

// Init ------------------- //
var game = new createGame({
  texturePath: './textures/',
  generate: (x, y) => y === 80 ? 1 : 0,
  chunkDistance: 1,
  worldOrigin: [0, 0, 0],
  fogDisabled: true,
  generateChunks: true,
  playerHeight: 1.8,
})
game.appendTo(document.body)

// create the terrain
// game.voxels.on('missingChunk', function(p) {
  // var voxels = terrain(p, 32);
  // var chunk = {
  //   position: p,
  //   dims: [32, 32, 32],
  //   voxels: voxels
  // };
  // game.showChunk(chunk);
// });

var player = new createPlayer(game)('textures/player.png')
player.possess()
player.yaw.position.set(0, 100, 0)