const sequelize = require("../../db");
const { DataTypes } = require("sequelize");
const { Product } = require("./product");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: true },
    surname: { type: DataTypes.STRING, allowNull: true },
    role: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^\+?\d{1,15}$/,
          msg: "Invalid phone number format",
        },
      },
    },
  },
  { timestamps: false },
);

const UserFavoriteProduct = sequelize.define(
  "UserFavoriteProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false },
);

const Cart = sequelize.define(
  "Cart",
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
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  },
);

const Token = sequelize.define(
  "Token",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: false },
);

// Favorite list of products user
User.belongsToMany(Product, { through: UserFavoriteProduct });
Product.belongsToMany(User, { through: UserFavoriteProduct });

// Shopping cart
// User.belongsToMany(Product, { through: Cart });
// Product.belongsToMany(User, { through: Cart });

// JWT token (1 - 1)
User.hasOne(Token);
Token.belongsTo(User);

module.exports = { User, UserFavoriteProduct, Token, Cart };
