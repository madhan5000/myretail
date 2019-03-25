
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import database from './data/mockDb'
import error from './utils/errors'
import productName from './external/product'
import producePrice from './external/price'
import config from './config'
import log from './logger'
import cron from 'node-cron'

const logger = log(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*

*/

app.get('/api/v1/products/:id', async (req, res) => {
    const _id = req.params.id;
    logger.debug(`req.params.id: ${_id}`);
    let item =  { "id": 0, "name": "", "current_price": { "value": 0, "currency_code": "USD" } ,"status":[]} ;
    item.id = _id;
    let productServiceError = false;
    let priceServiceError = false;
    try{
        let name = await productName(_id);
        logger.info(name);
        item.name = name;
    }
    catch(err){
        logger.debug(JSON.stringify(err));
        item.status.push(JSON.parse(JSON.stringify(err)));
        if(err.error.code == error.SERVICE_UNAVAILABLE.error.code){
            productServiceError = true;
        }
    }
    try{
        let price = await producePrice(_id);
        logger.info(price);
        item.current_price.value = price;
    }
    catch(err){
        logger.debug(JSON.stringify(err));
        item.status.push(JSON.parse(JSON.stringify(err)));
        if(err.error.code == error.SERVICE_UNAVAILABLE.error.code){
            priceServiceError = true;
        }
    }

    if(productServiceError || priceServiceError){
        //use cached value?
        let dbItem = database.find((item)=>{
            return item.id == _id;
        });
        if(dbItem){
            item.name = dbItem.name;
            item.current_price.value = dbItem.current_price.value;
            item.status.push({message : 'using cached value'});
        }
        
    }
    else{
        //update database

    }

    return res.status(200).send(item);
});


app.listen(config.app.port, () => {
    logger.info(`Server is running on ${config.app.port}`);
});

/*
cron.schedule("* * * * *", ()=>{ //runs every minute
    logger.info('Cron running');
    (async ()=>{

    })
});*/