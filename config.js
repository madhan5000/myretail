// config.js
import dotenv from 'dotenv'

dotenv.config();

console.log(process.env.NODE_ENV)


const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3000
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: parseInt(process.env.DEV_DB_PORT) || 27017,
   name: process.env.DEV_DB_NAME || 'db'
 },
 extApi :{
     product : process.env.DEV_PRODUCT_API || 'localhost:3001/products',
     price   : process.env.DEV_PRICE_API   || 'localhost:3002/price'
 }
};
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 3000
 },
 db: {
   host: process.env.TEST_DB_HOST || 'localhost',
   port: parseInt(process.env.TEST_DB_PORT) || 27017,
   name: process.env.TEST_DB_NAME || 'test'
 }
};
const prod = {
    app: {
      port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db: {
      host: process.env.PROD_DB_HOST || 'localhost',
      port: parseInt(process.env.PROD_DB_PORT) || 27017,
      name: process.env.PROD_DB_NAME || 'db'
    },
    extApi :{
        product : process.env.PROD_PRODUCT_API || 'localhost:3001/products',
        price   : process.env.PROD_PRICE_API   || 'localhost:3002/price'
    }
};
const config = {
 dev,
 test,
 prod
};

module.exports = config[env];