module.exports = {
    HOST: 'us-cdbr-east-04.cleardb.com',
    USER: 'ba60b1dd65e723',
    PASSWORD: 'f3917b20',
    DB: 'heroku_a8c597d47cbb801',
   
    /*HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'kolbowsky',
    DB: 'ayg',*/
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };