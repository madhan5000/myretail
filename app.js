
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import database from './data/mockDb'
import errors from './utils/errors'

const app = express()
const PORT = 3000 || process.env.PORT ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*

*/

app.get('/api/v1/products/:id', (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    let response = database.find((item)=>{
        return item.id == _id;
    }) || errors.NOTFOUND ;
    return res.status(200).send(response);
});


app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
});