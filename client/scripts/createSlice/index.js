const createTemplate = require('./templates/createTemplate.js');
const firstCharUpperCase = require('./firstCharUpperCase');

// Третий аргумент переданный в командную строку
const layer = process.argv[2];
const sliceName = firstCharUpperCase(process.argv[3]);

const layerTypes = ['features', 'pages', 'entities'];

if (!layer || !layerTypes.includes(layer)) {
    throw new Error(`Укажите слой ${layerTypes.join(' или ')}`);
}

if (!sliceName) {
    throw new Error('Укажите название slice');
}

createTemplate(layer, sliceName);