const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const Brand = sequelize.define(
  "Brand",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    foundation: { type: DataTypes.SMALLINT },
    country: { type: DataTypes.STRING(100) },
    logo: { type: DataTypes.STRING },
    data: { type: DataTypes.BLOB },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["name"],
      },
    ],
  },
);

Brand.addHook("afterFind", "countProducts", async (brands) => {
  if (!Array.isArray(brands)) {
    brands = [brands];
  }
  for (const brand of brands) {
    const productCount = await Product.count({ where: { BrandId: brand.id } });
    brand.setDataValue("productCount", productCount);
  }
});

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false },
    sex: { type: DataTypes.CHAR, allowNull: true },
    code: { type: DataTypes.STRING, allowNull: false },
    colors: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  },
  {
    timestamps: false,
    indexes: [
      {
        concurrently: true,
        using: "GIN",
        fields: [sequelize.literal("name gin_trgm_ops")],
      }
    ],
  },
);

// {
//   unique: false,
//     fields: ["name"],
// },

const Image = sequelize.define(
  "Image",
  {
    url: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false },
);

const Size = sequelize.define(
  "Size",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  { timestamps: false },
);

// Brands
Brand.hasMany(Product);
Product.belongsTo(Brand);

// Sizes and Images products
Product.hasMany(Image, { foreignKey: "productId" });
Product.hasMany(Size, { foreignKey: "productId" });

module.exports = {
  Product,
  Image,
  Size,
  Brand,
};
