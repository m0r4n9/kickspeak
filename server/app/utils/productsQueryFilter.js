const { Op, literal } = require('sequelize');
const { Size } = require('../models/models');

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
    if (!colors || colors.length === 0)
        return {
            required: false,
        };

    const colorsArray = colors.split(',');
    return {
        where: {
            name: colorsArray,
        },
    };
}

function brandsFilter(brands) {
    if (!brands || brands.length === 0) return { required: false };

    const brandsArray = brands.split(',');
    return {
        where: {
            name: brandsArray,
        },
    };
}

function sizesFilter(sizes) {
    if (!sizes || sizes.length === 0)
        return [
            {
                model: Size,
                attributes: ['id', 'name'],
                required: false,
                where: {
                    quantity: {
                        [Op.ne]: 0,
                    },
                },
            },
        ];

    const sizesArray = sizes.split(',');

    return [
        {
            model: Size,
            attributes: ['id', 'name'],
            required: true,
            where: {
                name: sizesArray,
            },
        },
    ];
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

module.exports = {
    typeOrder,
    colorsFilter,
    priceFilter,
    sexFilter,
    brandsFilter,
    sizesFilter,
};
