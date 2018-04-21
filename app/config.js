const texturePath = './static/textures/';
const createGameConfig = {
  texturePath,
  generate: (x, y) => y === 80 ? 1 : 0,
  materials: [['grass', 'dirt', 'grass_dirt']],
  chunkDistance: 1,
  worldOrigin: [0, 0, 0],
  fogDisabled: true,
  generateChunks: true,
  playerHeight: 1.8,
};

module.exports = {
  texturePath,
  createGameConfig,
};
