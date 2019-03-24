import utils from './utils'

const error = {
    'NOTFOUND' : utils._message({code : 'NOTFOUND',message : 'item not found'}),
    'SERVICE_UNAVAILABLE' : utils._message({code : 'SERVICE_UNAVAILABLE', message : 'Service Unavaliable'})
}

export default error;