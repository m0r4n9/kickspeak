const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUi = require('./createUi')
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot('src', layer, sliceName));
  } catch (e) {
    console.log(`Не удалось создать директорию для слайса ${sliceName}`);
  }

  await createModel(layer, sliceName);
  await createUi(layer, sliceName);
  await createPublicApi(layer, sliceName);
}
