const path = require('path');
const config = require('./config');
const createGame = require('voxel-engine');
const game = new createGame(config.createGameConfig);
require('./hotpatch');

// TODO: make voxel-plugin dummy
// let reach;
// game.plugins = game.plugins || {};
// game.plugins.get = game.plugins.get || function get(value) {
//   switch (value) {
//     case 'voxel-reach':
//       return reach;
//     default:
//       return {};
//   }
// };

// voxel-plugins supported modules
const createPlayer = require('voxel-player')(game);
const registry = require('voxel-registry')(game); // eslint-disable-line
const highlight = require('voxel-highlight')(game); // eslint-disable-line
const reach = require('voxel-reach')(game, {reachDistance: 8}); // eslint-disable-line
const mine = require('voxel-mine')(game);

// Init --------------------------------------------------------------------- //
window.game = game;
game.appendTo(document.body);

const player = createPlayer(path.join(config.texturePath, 'player.png'));
player.possess();
player.yaw.position.set(0, 100, 0);

// blocks create/destroy ---------------------------------------------------- //
// window.addEventListener('mousedown', event => {
//   const ray = game.raycast();
//   if (!ray) return;

//   if (event.button === 0) game.setBlock(ray.voxel, 0);
//   else if (event.button === 2) game.setBlock(ray.adjacent, 1);
// }, false);

// ------------------------------------------------------ ------------------- //
// reach.on('use', function(target) { 
//   if (target)
//     game.createBlock(target.adjacent, 1);
// });

// reach.on('mining', function(target) { 
  // if (target)
  //   game.setBlock(target.voxel, 0);
// });

mine.on('break', function(target) {
  if (target) game.setBlock(target.voxel, 0);
  // do something to this voxel (remove it, etc.)
});