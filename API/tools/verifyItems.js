module.exports = verifyItems = (requestItem) => {
    
    // checks the requestItem(s) against a list of accepted items
        // returns true if all requestItem(s) are valid
        // returns the bad item if one is found 

    const acceptedItems = ['badges', 'bestStreak', 'blog',  'certifications', 
    'checkins', 'cohorts', 'currentStreak', 'gitHub', 'github', 'joinDate', 'lastCheckin',
    'points', 'portfolio', 'profilePic', 'skills', 'story', 'totalCheckins'];

    let badItem;

// one requestItem
    if(typeof requestItem === 'string') {
        if(!~acceptedItems.indexOf(requestItem)) badItem = requestItem;
    }

// multiple requestItems
    else if(Array.isArray(requestItem)) {
        !requestItem.some( item => {
            if(!~acceptedItems.indexOf(item)){
                badItem = item;
                return true;
            }
        });
    }

    return badItem ? badItem : true;
}