// const {Product, Image, Size, Brand} = require("../models/product");
// const {User, Cart, UserFavoriteProduct, Token} = require("../models/user");
// const url = require("url");
//
// async function fillModelData() {
//   const check = await Brand.count();
//   if (check) return;
//
//   const url_server = process.env.URL_SERVER;
//
//   // Company
//   await Brand.create({
//     name: "Converse",
//     foundation: 1908,
//     country: "США",
//     logo: `${url_server}/uploads/1691529752896-converseLogo.svg`,
//   });
//
//   await Brand.create({
//     name: "Gramicci",
//     foundation: 1982,
//     country: 'США',
//     logo: `${url_server}/uploads/gramicci-brandshop.svg`
//   })
//
//   await Brand.create({
//     name: 'Rick Owens',
//     foundation: 1994,
//     country: 'Франция',
//     logo: `${url_server}/uploads/rick-owens-brandshop-logo-main.svg`
//   })
//
//   await Brand.create({
//     name: 'teNeues',
//     foundation: 1931,
//     country: 'Германия',
//     logo: `${url_server}/uploads/teneues-logo.svg`
//   })
//
//   await Brand.create({
//     name: 'thisisneverthat',
//     foundation: 2009,
//     country: 'Южная Корея',
//     logo: `${url_server}/uploads/thisisneverthat-logo.svg`
//   })
//
//   await Brand.create({
//     name: 'SOPHNET',
//     foundation: 1998,
//     country: 'Япония',
//     logo: `${url_server}/uploads/sophnet-logo-brandshop.svg`
//   })
//
//
//   const adidas = await Brand.create({
//     name: "adidas Originals",
//     foundation: 1997,
//     country: "Германия",
//     logo: `${url_server}/uploads/adidasLogo.svg`
//   });
//
//   await Brand.create({
//     name: "Timberland",
//     foundation: 1952,
//     country: "США",
//     logo: `${url_server}/uploads/timberland-brandshop-1.svg`
//   });
//
//   const drMartensBrand = await Brand.create({
//     name: "Dr. Martens",
//     foundation: 1947,
//     country: "Великобритания",
//     logo: `${url_server}/uploads/drMartensLogo.svg`
//   });
//
//   // First item
//   const product1 = await Product.create({
//     name: "Кеды Chuck 70 High It's Possible",
//     price: 14490,
//     code: "A01736",
//     BrandId: 1,
//     colors: ["black"],
//     sex: 'M'
//   });
//
//   await Size.create({name: "36.5", productId: product1.id});
//   await Size.create({name: "37", productId: product1.id});
//   await Size.create({name: "37.5", productId: product1.id});
//   await Size.create({name: "38.5", productId: product1.id});
//   await Size.create({name: "39", productId: product1.id});
//   await Size.create({name: "40.5", productId: product1.id});
//
//   for (let i = 0; i < 7; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/a01736-${i}_1104x1104.jpg`,
//       productId: product1.id,
//     });
//   }
//
//   // Second item
//   const product2 = await Product.create({
//     name: "Мужские кеды x Comme des Garcons Play Chunk 70 Hi",
//     price: 14490,
//     code: "AO1736",
//     brandId: 1,
//     colors: ["white"],
//     sex: 'W'
//   });
//
//   await Size.create({name: "37.5", productId: product2.id});
//   await Size.create({name: "37", productId: product2.id});
//   await Size.create({name: "38", productId: product2.id});
//
//   for (let i = 0; i < 6; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/168300-${i}_1104x1104.jpg`,
//       productId: product2.id,
//     });
//   }
//
//   // Third item
//   const product3 = await Product.create({
//     name: "Кеды x A-COLD-WALL* Chuck 70 High",
//     price: 14490,
//     code: "AO2277",
//     brandId: 1,
//     colors: ["white", "black"],
//     sex: 'M'
//   });
//
//   await Size.create({name: "36", productId: product3.id});
//   await Size.create({name: "36.5", productId: product3.id});
//   await Size.create({name: "37", productId: product3.id});
//
//   for (let i = 0; i < 7; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/a02277-${i}_1104x1104.jpg`,
//       productId: product3.id,
//     });
//   }
//
//   const productMartens = await Product.create({
//     name: "Женские ботинки 1460 Smoothеды x A-COLD-WALL* Chuck 70 High",
//     price: 23890,
//     code: "11821006",
//     brandId: drMartensBrand.id,
//     colors: ["yellow", "black"],
//     sex: 'M'
//   });
//
//   await Size.create({name: "36", productId: productMartens.id});
//
//   for (let i = 0; i < 6; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/zhenskie-botinki-dr-martens-1460-smooth-black-${
//         7 + i
//       }_1104x1104.jpg`,
//       productId: productMartens.id,
//     });
//   }
//
//   const productYEEZYKnit = await Product.create({
//     name: "Мужские кроссовки YEEZY BSKTBL Knit",
//     price: 21990,
//     code: "HP5613",
//     brandId: adidas.id,
//     colors: ["blue", "black", "orange"],
//     sex: 'U'
//   });
//
//   await Size.create({name: "42", productId: productYEEZYKnit.id});
//   await Size.create({name: "42.5", productId: productYEEZYKnit.id});
//   await Size.create({name: "43.5", productId: productYEEZYKnit.id});
//   await Size.create({name: "44", productId: productYEEZYKnit.id});
//   await Size.create({name: "44.5", productId: productYEEZYKnit.id});
//
//   await Image.create({
//     url: `${url_server}/uploads/hp5613-0_1104x1104.jpg`,
//     productId: productYEEZYKnit.id,
//   });
//   await Image.create({
//     url: `${url_server}/uploads/hp5613-1_1104x1104.jpg`,
//     productId: productYEEZYKnit.id,
//   });
//   await Image.create({
//     url: `${url_server}/uploads/hp5613-2_1104x1104.jpg`,
//     productId: productYEEZYKnit.id,
//   });
//   await Image.create({
//     url: `${url_server}/uploads/hp5613-3_1104x1104.jpg`,
//     productId: productYEEZYKnit.id,
//   });
//   await Image.create({
//     url: `${url_server}/uploads/hp5613-4_1104x1104.jpg`,
//     productId: productYEEZYKnit.id,
//   });
//   await Image.create({
//     url: `${url_server}/uploads/hp5613-5_1104x1104.jpg`,
//     productId: productYEEZYKnit.id,
//   });
//
//   const productYEEZY = await Product.create({
//     name: "Кроссовки YEEZY 500 High",
//     price: 19990,
//     code: "GW2874",
//     brandId: adidas.id,
//     colors: ["blue", "red", "orange"],
//   });
//
//   for (let i = 1; i <= 6; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/gw2873-${i}_1104x1104.jpg`,
//       productId: productYEEZY.id,
//     });
//   }
//
//   await Size.create({name: "39.5", productId: productYEEZY.id});
//   await Size.create({name: "42.5", productId: productYEEZY.id});
//   await Size.create({name: "43.5", productId: productYEEZY.id});
//
//   const productYEEZY2 = await Product.create({
//     name: "Кроссовки YEEZY 500 High",
//     price: 19990,
//     code: "FY4269",
//     brandId: adidas.id,
//     colors: ["violet", "black"],
//     sex: 'W'
//   });
//
//   for (let i = 1; i <= 6; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/krossovki-adidas-originals-yeezy-500-high-tyrian-tyrian-tyrian-${i}_1104x1104.jpg`,
//       productId: productYEEZY2.id,
//     });
//   }
//
//   await Size.create({name: "36", productId: productYEEZY2.id});
//   await Size.create({name: "36.5", productId: productYEEZY2.id});
//   await Size.create({name: "37.5", productId: productYEEZY2.id});
//   await Size.create({name: "38.5", productId: productYEEZY2.id});
//
//   const productYEEZY700 = await Product.create({
//     name: "Кроссовки YEEZY 700 V3",
//     price: 19990,
//     code: "G54853",
//     brandId: adidas.id,
//     colors: ["orange", "white"],
//     sex: 'U'
//   });
//
//   for (let i = 1; i <= 6; i++) {
//     await Image.create({
//       url: `${url_server}/uploads/g54853-${i}_1104x1104.jpg`,
//       productId: productYEEZY700.id,
//     });
//   }
//
//   await Size.create({name: "36", productId: productYEEZY700.id});
//   await Size.create({name: "36.5", productId: productYEEZY700.id});
//
// }
//
// module.exports = {fillModelData};
