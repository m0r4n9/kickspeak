const {Sequelize} = require('sequelize');

module.exports = new Sequelize(process.env.POSTGRESQL_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    searchPath: ['public', 'pg_trgm'],
    ssl:
      {
        require: true,
        rejectUnauthorized: false
      }
  }
})

// module.exports = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: 'postgres',
//     dialectOptions: {
//       searchPath: ['public', 'pg_trgm']
//     },
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT
//   },
//
// )
