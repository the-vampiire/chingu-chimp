/**
 * Created by Vampiire on 8/10/17.
 */

// checks for an existing /  adds a new cohort
checkAndAddCohort = (cohorts, cohortName) => {

// cohortName comes in in the form [cohort-name-style] and must be processed to [Cohort Name Style] for comparison
    cohortName = cohortName.slice(cohortName.lastIndexOf('/')+1)
        .split('-')
        .map(word => word = `${word.slice(0,1).toUpperCase()}${word.slice(1)}`)
        .join(' ');

// if the passed match is not found in the array of then add it
    if(!cohorts.some( e => e.cohortName === cohortName)){
        // add a badge for each cohort?
        // new cohort?
        // 3+?
        cohorts.push({cohortName: cohortName});
    }



    return cohorts;
};

// updates the user's streak when checking in
streakUpdater = (checkins, currentStreak, bestStreak) => {

    if(currentStreak.value === 0 && bestStreak === 0) currentStreak.value++;

    let currentDate = Number(Date.now());

    if(currentDate - currentStreak.lastUpdate >= 86400000){

        let resetStreak = !checkins.some( checkin => {
            let sessionsArray = checkin.sessions, lastDate = sessionsArray[sessionsArray.length - 1].date;

            if (currentDate - lastDate <= 86400000) {
                currentStreak.value++;
                return true;
            }
        });

        if(resetStreak) currentStreak = 0;

        currentStreak.lastUpdate = currentDate;
    }

    if (bestStreak < currentStreak.value) bestStreak = currentStreak.value;

    return {currentStreak, bestStreak};
};


// returns a badge object to add to the badges array
newBadge = type => {

// badge types
    // 'betaTester',
    const newBadge = {};

// allow the community to make badges
    // have each beta testing team provide a badge that can be added here

    switch(type){
        case 'Chingu Chimp Beta Tester':
            newBadge.badgeType = 'betaTester';
            newBadge.name = 'Beta Tester: Chingu Chimp';
            // newBadge.url = 'http://chevellestuff.net/styles/images/crown.png';
            newBadge.url = 'https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/law-add-16x16.gif';
            // newBadge.url = 'http://www.monkeymods.com/wp-content/uploads/2015/05/monkey-fav2.png';
            // newBadge.url = 'https://www.bernewitness.com/favicon-16x16.png';
            break;
        case 'project1':
            break;
        case 'project5':
            break;
        case 'help5':
            break;
        case 'help10':
            break;
    }

    return newBadge;
};

module.exports = {
    checkAndAddCohort,
    streakUpdater,
    newBadge
};


