import https from 'https'
import error from '../utils/errors'
import utils from '../utils/utils'
import config from '../config'
import log from '../logger'
const logger = log(__filename);

const getPriceDetails = (productId)=>{
    return new Promise ((resolve,reject)=>{
       
        const apiUrl = config.extApi.price.replace('${productId}',productId);
        const request = https.get(apiUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });
          
            res.on('end', () => {
                let result = JSON.parse(data);
                logger.debug(JSON.stringify(result));
                if(utils._isEmpty(result.product.item)){
                    logger.info(`${productId} : NOT FOUND in price API`);
                    const notFound = {
                      'service' : 'price',
                      'status'  : error.NOTFOUND
                    } ;
                    reject(notFound);
                }else{
                    resolve(result.product.price.offerPrice.price);
                  }
            });
          
          }).on("error", (err) => {
            logger.debug(err);
            const serviceError ={
              'service' : 'price',
              'status' : error.SERVICE_UNAVAILABLE
            } ;
            reject(serviceError);
          });
    })
    
}

export default getPriceDetails;
