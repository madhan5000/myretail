
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import database from './data/mockDb'
import error from './utils/errors'
import productName from './external/product'
import producePrice from './external/price'

const app = express()
const PORT = 3000 || process.env.PORT ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*

*/

app.get('/api/v1/products/:id', async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    try{
        let name = await productName(_id);
    }
    catch(err){
        console.log(err);
    }
    try{
        let price = await producePrice(_id);
    }
    catch(err){
        console.log(err);
    }
    let response = database.find((item)=>{
        return item.id == _id;
    }) || error.NOTFOUND ;
    return res.status(200).send(response);
});


app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
});