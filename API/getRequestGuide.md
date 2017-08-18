# GET endpoint: /API/request

Make a GET request to https://chingu-chimp.herokuapp.com/API/request
Pass a query string with the respective parameters for your request

================================================================================
#### Request a single item for a single user                               
================================================================================         

**Method**: One user one item           
**Request parameters**: { key: APIkey, userName: user to request, profileItem: item to request for that user }

**Returns**: JSON = {
            ok: true,
            status: 200,
            body: {
                userName: userName,
                itemName: itemValue
            }
        }

================================================================================ 
#### Request multiple items for a single user
================================================================================ 

**Method**: One user bulk items
**Request parameters**: { key: APIkey, userName: user to request, bulkItems: [array of request items] }

Returns: JSON = {
            ok: true,
            status: 200,
            body: {
                userName: userName,
                items: [
                    {
                        itemName: itemValue
                    },
                    {
                        itemName(N): itemValue(N)
                    }
                ]
            }
        }

================================================================================ 
#### Requesting a single item for multiple users 
================================================================================ 

**Method**: Bulk users one item
**Request parameters**: { key: APIkey, bulkUsers: [array of users to request], profileItem: item to request per user }

Returns: JSON = {
            ok: true,
            status: 200,
            body: {
                users: [
                    {
                        userName: userName,
                        itemName: itemValue
                    },
                    {
                        userName(N): userName(N),
                        itemName(N): itemValue(N)
                    }
                ]
            }
        }

================================================================================ 
#### Requesting multiple items for multiple users
================================================================================ 

**Method**: Bulk users bulk items       
**Request parameters**: { key: APIkey, bulkUsers: [array of users], bulkItems: [array of items to return per user]}

Returns: JSON = {
            ok: true,
            status: 200,
            body: {
                users: [
                    {
                        userName: userName,
                        items: [
                            {
                                itemName: itemValue
                            },
                            {
                                itemName(N): itemValue(N)
                            }
                        ]
                    },
                    {
                        userName(N): userName(N),
                        items: [
                            {
                                itemName: itemValue
                            },
                            {
                                itemName(N): itemValue(N)
                            }
                        ]
                    }
                ]
            }
        }

================================================================================ 
#### Error Responses -> ok: false, status: !== 200
================================================================================ 

**Error**: missing [profileItem] or [bulkItems]
Returns: JSON = {
    ok: false,
    status: 400,
    error: {
        message: 'Requests must include either an item [profileItem] or a bulk items array [bulkItems]',
        code: 'missing_item'
    }
}

**Error**: missing [userName] or [bulkUsers]
Returns: JSON = {
    ok: false,
    status: 400,
    error: {
        message: 'Requests must include either a user name [userName] or a bulk users array [bulkUsers]',
        code: 'missing_user'
    }
}

**Error**: invalid API key
Returns: JSON = {
    ok: false,
    status: 401,
    error: {
        message: 'Invalid API key', 
        code: 'invalid_key'
    }
}

**Error**: invalid profile item requested 
Returns: JSON = {
    ok: false,
    status: 404,
    error: {
        message: 'User [invalid user] not found',
        code: 'user_not_found'
    }
}