const path = require('path');
const config = require('./config');
const createGame = require('voxel-engine');
const createPlugins = require('voxel-plugins');
// const shell = require('gl-now')();
const game = new createGame(config.createGameConfig);
game.controls.fire_rate = 10; // req for voxel-mine
// game.shell = shell;
// game.shell = { on: () => {} };

const plugins = createPlugins(game);
plugins.add('voxel-player', require('voxel-player'), {});
plugins.add('voxel-registry', require('voxel-registry'), {});
plugins.add('voxel-highlight', require('voxel-highlight'), {});

plugins.add('voxel-reach', require('voxel-reach'), { reachDistance: 8 });
plugins.add('voxel-mine', require('voxel-mine'), {});
// plugins.add('voxel-stitch', require('voxel-stitch'), { artpacks: ["http://localhost:3001/ProgrammerArt-v3.0-ResourcePack-MC19.zip"] });
// plugins.add('voxel-mesher', require('voxel-mesher'), {});
// plugins.add('voxel-decals', require('voxel-decals'), {});

// plugins.add('voxel-engine-stackgl', require('voxel-engine'), {});
plugins.loadAll();

require('./hotpatch'); // just for hot reloading during dev
window.game = game; // for dev as well

// Init --------------------------------------------------------------------- //
game.appendTo(document.body);

const createPlayer = plugins.get('voxel-player');
const player = createPlayer(path.join(config.texturePath, 'player.png'));

player.possess();
player.yaw.position.set(0, 100, 0);

// ------------------------------------------------------ ------------------- //
const reach = plugins.get('voxel-reach');
reach.on('use', target => {
  if (target) game.createBlock(target.adjacent, 1);
});

// reach.on('mining', target => {
//   if (target) game.setBlock(target.voxel, 0);
// });

const mine = plugins.get('voxel-mine');
mine.on('break', target => {
  if (target) game.setBlock(target.voxel, 0);
  // do something to this voxel (remove it, etc.)
});
