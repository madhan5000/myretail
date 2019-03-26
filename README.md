# myretail

A restful API service that can retrive product details based on 'Product ID'

This service is implemented using Node JS / Express framework

Instructions to run this service

```
$ git clone repo
```

```
$ npm i
```

### Development 

```
$ npm run start-dev
```

### Production

edit .env file and set NODE_ENV='prod'

```
$ npm run start-prod
```

# API usage

To GET details of a particular product specified by productId

/api/v1/products/< productId >

```
curl http://127.0.0.1:3000/api/v1/products/13860428
```

Resulting JSON

```JSON
{
    "id": 13860428,
    "name": "The Big Lebowski (Blu-ray) (Widescreen)",
    "current_price": {
        "value": 13.49,
        "currency_code": "USD"
    }
}
```


## To add a new product 

/api/v1/products/< productId >

```bash
curl -X PUT -d '{"id": "11111111","name": "updated Item 11111111","current_price": {
"value": 16,"currency_code": "USD"}}' -H "Content-Type: application/json" http://127.0
.0.1:3000/api/v1/products/11111111
 ```

Resulting JSON
```JSON
{"success":{"message":"item 11111111 inserted"}}
```

## To update an existing product

/api/v1/products/< productId >

```bash
curl -X POST -d '{"id": "13860428","name": "updated Item 13860428","current_price": {
"value": 16,"currency_code": "USD"}}' -H "Content-Type: application/json" http://127.0
.0.1:3000/api/v1/products/13860428
```
Resulting JSON

```JSON
{"success":{"message":"item 13860428 updated"}}

```

# TO DO
* Add support for Database, current is using in memory datastore.
* Make a docker container
* Improve security
  - Verify token for PUT and POST
* Improve validation
  - Validate incoming JSON
* Implement caching for frequently requested product Ids.
  - show cached data when External API services are Down ?
* Add Swagger docs 