# Chingu Chimp API: Get Requests

### **Endpoint:** `https://chingu-chimp.herokuapp.com/API/request`

================================================================================
#### Valid profile items

    ['badges', 'bestStreak', 'blog',  'certifications', 
        'checkins', 'cohorts', 'currentStreak', 'gitHub', 
        'github', 'joinDate', 'lastCheckin',
        'portfolio', 'profilePic', 'skills', 'story'];

================================================================================
### Request a single item for a single user                                        

**Method**: One user one item 

**Request parameters**: 

    { 
        key: APIkey, 
        userName: requested user, 
        profileItem: requested item
    }

**Returns**: 

    JSON =  {
        ok: true,
        status: 200,
        body: {
            userName: userName,
            itemName: itemValue
        }
    }

================================================================================
#### Request multiple items for a single user 

**Method**: One user bulk items

**Request parameters**: 

    { 
        key: APIkey, 
        userName: requested user, 
        bulkItems: [ array of requested profileItems ] 
    }

**Returns:** 

    JSON =  {
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

**Method**: Bulk users one item

**Request parameters**: 

    { 
        key: APIkey, 
        bulkUsers: [ array of requested userNames ], 
        profileItem: requested item for each user
    }

**Returns:** 

    JSON =  {
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

**Method**: Bulk users bulk items 

**Request parameters**: 

    { 
        key: APIkey, 
        bulkUsers: [ array of requested userNames ], 
        bulkItems: [ array of requested profileItems for each user ]
    }

**Returns:** 

    JSON = {
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
#### Error Responses

**Error**: missing `[profileItem]` or `[bulkItems]`
    
    JSON = {
        ok: false,
        status: 400,
        error: {
            message: 'Requests must include either an item [profileItem] or a bulk items array [bulkItems]',
            code: 'missing_item'
        }
    }

**Error**: missing `[userName]` or `[bulkUsers]`
    
    JSON = {
        ok: false,
        status: 400,
        error: {
            message: 'Requests must include either a user name [userName] or a bulk users array [bulkUsers]',
            code: 'missing_user'
        }
    }

**Error**: invalid API key

    JSON = {
        ok: false,
        status: 401,
        error: {
            message: 'Invalid API key', 
            code: 'invalid_key'
        }
    }

**Error**: invalid profile item requested 

    JSON = {
        ok: false,
        status: 401,
        error: {
            message: 'Invalid profile item [invalid item] requested',
            code: 'invalid_item'
        }
    }

**Error**: user not found 

    JSON = {
        ok: false,
        status: 404,
        error: {
            message: 'User [invalid user] not found',
            code: 'user_not_found'
        }
    }