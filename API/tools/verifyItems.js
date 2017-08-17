module.exports = verifyItems = (requestItem) => {
    
    const acceptedItems = ['badges', 'bestStreak', 'blog',  'certifications', 
    'checkins', 'cohorts', 'currentStreak', 'gitHub', 'github', 'joinDate', 'lastCheckin',
    'portfolio', 'profilePic', 'skills', 'story'];

    let badItem;

    if(typeof requestItem === 'string') {
        if(!~acceptedItems.indexOf(requestItem)) badItem = requestItem;
    }

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