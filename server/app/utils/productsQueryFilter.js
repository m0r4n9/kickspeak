const { Op } = require('sequelize');

function typeOrder(order) {
    let atrOrder;
    switch (order) {
        case 'ascPrice':
            atrOrder = ['price', 'ASC'];
            break;
        case 'descPrice':
            atrOrder = ['price', 'DESC'];
            break;
        default:
            atrOrder = ['id', 'DESC'];
            break;
    }

    return atrOrder;
}

function colorsFilter(colors) {
    console.log('Colors: ', colors);
    if (!colors || colors.length === 0) return {};

    let resultColors = [];

    let arrayColors = colors.split(',');

    for (let color of arrayColors) {
        resultColors.push({
            [Op.contains]: [color],
        });
    }

    return { colors: { [Op.or]: resultColors } };
}

function priceFilter(price) {
    if (!price) return {};
    let resultPrice = price.split(',');
    if (resultPrice[0] === '0' && resultPrice[1] === '0') return {};
    return { price: { [Op.between]: resultPrice } };
}

function sexFilter(sex) {
    if (!sex) return {};
    const sexFields = sex.split(',');
    return { sex: sexFields };
}

function brandFilter(brandId) {
    if (!brandId) return {};
    return {
        BrandId: brandId,
    };
}

module.exports = {
    typeOrder,
    colorsFilter,
    priceFilter,
    sexFilter,
    brandFilter,
};
