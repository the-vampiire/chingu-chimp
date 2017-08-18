module.exports = APIerror = (type, error, specificErrorMessage) => {
    
        error.ok = false;
    
        switch(type){
            case 'itemMissing':
                error.status = 400;
                error.error = {
                    message: 'Requests must include either an item or a bulk items array',
                    code: 'missing_item'
                };
                break;
            case 'userMissing':
                error.status = 400;
                error.error = {
                    message: 'Requests must include either a user name or a bulk users array',
                    code: 'missing_user'
                };
                break;
            case 'invalidKey':
                error.status = 401;
                error.error = { 
                    message: 'Invalid API key', 
                    code: 'invalid_key'
                };
                break;
            case 'invalidItem':
                error.status = 401;
                error.error = { 
                    message: `Invalid profile item [${specificErrorMessage}] requested`,
                    code: 'invalid_item'
                };
                break;
            case 'userNotFound':
                error.status = 404;
                error.error = {
                    message: specificErrorMessage,
                    code: 'user_not_found'
                };
        }
    
        return error;
    };