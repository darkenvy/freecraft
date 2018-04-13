// const voxel = require('voxel');
const path = require('path');
const createGame = require('voxel-engine');
const createPlayer = require('voxel-player');
const highlight = require('voxel-highlight');
const { texturePath, createGameConfig } = require('./config');
require('./hotpatch');

const game = new createGame(createGameConfig);
const player = new createPlayer(game)(path.join(texturePath, 'player.png'));

// Init --------------------------------------------------------------------- //
window.game = game;
highlight(game);

game.appendTo(document.body);
player.possess();
player.yaw.position.set(0, 100, 0);

// blocks create/destroy ---------------------------------------------------- //
window.addEventListener('mousedown', event => {
  const ray = game.raycast();
  if (!ray) return;

  if (event.button === 0) game.setBlock(ray.voxel, 0);
  else if (event.button === 2) game.setBlock(ray.adjacent, 1);
}, false);

// ------------------------------------------------------ ------------------- //
