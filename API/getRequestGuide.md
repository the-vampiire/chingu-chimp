# Chingu Chimp API: Get Requests

### **Endpoint:** `https://chingu-chimp.herokuapp.com/API/request`

================================================================================
## Available Profile Items and Descriptions

### Notes:
* All date properties are integer unix timestamps in milliseconds
* Unless otherwise specified all profile items and item properties can be assumed to be strings
* Array profile item descriptions are followed by the format and description of the their object elements

================================================================================

**badges:** an array of the user's badge objects

    badge = {
        badgeType : badge category,
        name : badge name / text,
        url : badge icon url,
        color : (SLACK) badge attachment color
    }

**bestStreak:** an integer value of the user's longest streak days

**blog:** url of the user's blog

**certifications:** an array of the user's certification objects

    certification = {
        name: certification name,
        url: certificate url,
        date: unix timestamp of the certification date 
    }

**checkins:** an array checkin objects

    checkin = {
        channelID: (SLACK) channel ID,
        sessions: [ array of check-in session objects ]
    }

        session = {
            kind: kind of checkin - accountability, pair programming, self check-in, team meeting
            task: kind-specific task that the user(s) worked on,
            partners: [ array of partner(s) user names ],
            date: unix timestamp date of check-in
        }

**cohorts:** an array of cohorts the user has been a part of

    cohort = {
        cohortName: the name of the cohort,
        teamID: (SLACK) cohort team ID,
        userID: (SLACK) user ID for that team,
        startDate: unix timestamp cohort start date,
    }

**currentStreak:** an integer value of the user's current streak days

**gitHub:** url of the user's GitHub profile

**joinDate:** unix timestamp of the user's Chingu join date

**lastCheckin:** session object of the user's last checkin session

    session = {
            kind: kind of checkin - accountability, pair programming, self check-in, team meeting
            task: kind-specific task that the user(s) worked on,
            partners: [ array of partner(s) user names ],
            date: unix timestamp date of check-in
        }

**points:** an integer value of the user's Chingu points

**portfolio:** url of the user's portfolio page

**profilePic:** profilePic object containing url links to several profile picture sizes

    profilePic = {
        size_72 : url to 72x72 image,
        size_192 : url to 192x192 image,
        size_512 : url to 512x512 image,
        size_original : url to original upload image size,
        lastUpdate: unix timestamp of the last update date
    }

**skills:** object with sub-objects of the user's languages, frameworks and technologies. each skill sub-object is an array of individual objects having name and level properties representing that skill

##### Note: skill-level "hide" is a way to temporarily hide a skill from the user's profile while that skill is further developed. any skill with a level "hide" should not be displayed. 

    skills = {

        languages: [{
            name: language name,
            level: user skill-level
        }],

        frameworks: [{
            name: framework name,
            level: user skill-level
        }],

        technologies: [{
            name: technology name,
            level: user skill-level
        }]
    }

**story:** a (lengthy) string with Slack markdown formatting

**totalCheckins:** an integer value of the user's total checkins across all teams and channels

================================================================================
## Request a single item for a single user                                        

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
## Request multiple items for a single user 

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
## Requesting a single item for multiple users

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
## Requesting multiple items for multiple users 

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
## Error Responses

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