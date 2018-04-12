// const voxel = require('voxel');
const createGame = require('voxel-engine');
const createPlayer = require('voxel-player');
const path = require('path');
const texturePath = './static/textures/';

// import voxel from 'voxel';
// import createGame from 'voxel-engine';
// import createPlayer from 'voxel-player';
// Init ------------------- //
const game = new createGame({
  texturePath,
  generate: (x, y) => y === 80 ? 1 : 0,
  chunkDistance: 1,
  worldOrigin: [0, 0, 0],
  fogDisabled: true,
  generateChunks: true,
  playerHeight: 1.8,
});
game.appendTo(document.body);

// create the terrain
// game.voxels.on('missingChunk', function(p) {
  // const voxels = terrain(p, 32);
  // const chunk = {
  //   position: p,
  //   dims: [32, 32, 32],
  //   voxels: voxels
  // };
  // game.showChunk(chunk);
// });

const player = new createPlayer(game)(path.join(texturePath, 'player.png'));
player.possess();
player.yaw.position.set(0, 100, 0);
