import https from 'https'
import error from '../utils/errors'
import utils from '../utils/utils'
import config from '../config'
import log from '../logger'
const logger = log(__filename);

const getProductDetails = (productId)=>{
    return new Promise ((resolve,reject)=>{
        
        const apiUrl = config.extApi.product.replace('${productId}',productId);
        const request = https.get(apiUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });
          
            res.on('end', () => {
              let result = JSON.parse(data);
              logger.debug(JSON.stringify(result));
              if(utils._isEmpty(result.product.item)){
                logger.info(`${productId} : NOT FOUND in product API`);
                const notFound = error.NOTFOUND;
                notFound.error['service'] = 'product';
                reject(notFound);
              }else{
                resolve(result.product.item.product_description.title);
              }
              
            });
          
          }).on("error", (err) => {
            logger.debug(err);
            const serviceError = error.SERVICE_UNAVAILABLE;
            serviceError.error['service'] = 'product'
            reject(serviceError);
          });
    })
    
}

export default getProductDetails;
