const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const Brand = sequelize.define(
    'Brand',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        foundation: { type: DataTypes.SMALLINT },
        country: { type: DataTypes.STRING(100) },
        logo: { type: DataTypes.STRING },
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['name'],
            },
        ],
    },
);

const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER, allowNull: false },
        sex: { type: DataTypes.STRING(2), allowNull: true },
        code: { type: DataTypes.STRING, allowNull: false },
        colors: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    },
    {
        timestamps: false,
        indexes: [
            {
                concurrently: true,
                using: 'GIN',
                fields: [sequelize.literal('name gin_trgm_ops')],
            },
        ],
    },
);

const Image = sequelize.define(
    'Image',
    {
        url: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false },
);

const Size = sequelize.define(
    'Size',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    { timestamps: false },
);

const User = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: true },
        surname: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^\+?\d{1,15}$/,
                    msg: 'Invalid phone number format',
                },
            },
        },
    },
    { timestamps: false },
);

const UserFavoriteProduct = sequelize.define(
    'UserFavoriteProduct',
    {},
    { timestamps: false },
);

const Cart = sequelize.define(
    'Cart',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sizeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    },
);

const Token = sequelize.define(
    'Token',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        refreshToken: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: false },
);

// Favorite list of products user
User.belongsToMany(Product, { through: UserFavoriteProduct });
UserFavoriteProduct.belongsTo(User, { through: UserFavoriteProduct });
User.hasMany(UserFavoriteProduct);
UserFavoriteProduct.hasMany(User);
Product.hasMany(UserFavoriteProduct);
UserFavoriteProduct.hasMany(Product);

// Shopping cart
// User.belongsToMany(Product, { through: Cart });
// Product.belongsToMany(User, { through: Cart });

// JWT token (1 - 1)
User.hasOne(Token);
Token.belongsTo(User);

// Brands
Brand.hasMany(Product);
Product.belongsTo(Brand);

// Sizes and Images products
Product.hasMany(Image, { foreignKey: 'productId' });
Product.hasMany(Size, { foreignKey: 'productId' });

module.exports = {
    Product,
    Image,
    Size,
    Brand,
    User,
    UserFavoriteProduct,
    Token,
    Cart,
};
