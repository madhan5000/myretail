
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import database from './data/mockDb'
import error from './utils/errors'
import productName from './external/product'
import producePrice from './external/price'
import config from './config'

import log from './logger'
const logger = log(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*

*/

app.get('/api/v1/products/:id', async (req, res) => {
    const _id = req.params.id;
    logger.debug(`req.params.id: ${_id}`);
    try{
        let name = await productName(_id);
        logger.info(name);
    }
    catch(err){
       logger.debug(err);
    }
    try{
        let price = await producePrice(_id);
        logger.info(price);
    }
    catch(err){
        logger.debug(err);
    }
    let response = database.find((item)=>{
        return item.id == _id;
    }) || error.NOTFOUND ;
    return res.status(200).send(response);
});


app.listen(config.app.port, () => {
    logger.info(`Server is running on ${config.app.port}`);
});