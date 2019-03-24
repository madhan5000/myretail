import https from 'https'
import error from '../utils/errors'
import config from '../config'

const getPriceDetails = (productId)=>{
    return new Promise ((resolve,reject)=>{
        //const apiUrl = `https://redsky.target.com/v2/pdp/tcin/${productId}?excludes=taxonomy,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`;    
        const apiUrl = config.extApi.price.replace('${productId}',productId);
        const request = https.get(apiUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });
          
            res.on('end', () => {
                let result = JSON.parse(data);
                resolve(result.product.price.offerPrice.price);
            });
          
          }).on("error", (err) => {
            const serviceError = error.SERVICE_UNAVAILABLE;
            serviceError.error['service'] = 'price'
            reject(serviceError);
          });
    })
    
}

export default getPriceDetails;
