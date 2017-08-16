/**
 * Created by Vampiire on 8/10/17.
 *
 * supplemental functions used for database data manipulation
 *
 */


// checks for existing / adds missing badges
checkAndAddBadges = profileDoc => {

    let badges = profileDoc.badges;
    const certifications = profileDoc.certifications;
    const skills = profileDoc.skills;
        const languages = skills.languages;
        const frameworks = skills.frameworks;
    const projects = profileDoc.projects;
    const totalCheckins = profileDoc.totalCheckins;

    if(certifications.length) badges = updateBadges(certifications, badges, 'name');

    return badges;
};

// checks an array against the user's badges. adds any missing badges the user has earned
updateBadges = (eachArray, badges, matchProperty) => {

    eachArray.forEach( eachE => {
        if(!badges.some( badge => badge[matchProperty] === eachE[matchProperty]))
            badges.unshift(newBadge(eachE[matchProperty]))
    });

    return badges;

};

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

newBadge = (type, color) => {

    // let badges have specific colors as well

    const newBadge = {};
    switch(type){

    // BETA TESTING: CHINGU CHIMP
        case 'Chingu Chimp Beta Tester':
            newBadge.badgeType = 'beta';
            newBadge.name = 'Beta Tester: Chingu Chimp';
            newBadge.url = 'http://www.monkeymods.com/wp-content/uploads/2015/05/monkey-fav2.png';
            break;
        case 'Chimp Breaker':
            newBadge.badgeType = 'beta';
            newBadge.name = 'I broke the Chimp and all I got was a 16px badge';
            newBadge.url = 'https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/law-add-16x16.gif';
            break;

    // CERTIFICATIONS
        case 'Front End Certification':
            newBadge.badgeType = 'certification';
            newBadge.name = 'Front End Certification';
            newBadge.url = 'http://i.imgur.com/gXpgAdi.png';
            break;
        case 'Back End Certification':
            newBadge.badgeType = 'certification';
            newBadge.name = 'Back End Certification';
            newBadge.url = 'http://i.imgur.com/mY5qQew.png';
            break;
        case 'Data Visualization Certification':
            newBadge.badgeType = 'certification';
            newBadge.name = 'Data Visualization Certification';
            newBadge.url = 'http://i.imgur.com/IoTeInz.png';
            break;

    // CUSTOM
        case 'founder':
            newBadge.badgeType = 'custom';
            newBadge.name = 'Chingu Founder';
            newBadge.url = 'http://chevellestuff.net/styles/images/crown.png';
            break;
        case 'father':
            newBadge.badgeType = 'custom';
            newBadge.name = 'Father of the Chimp';
            newBadge.url = 'http://icons.iconarchive.com/icons/icons8/windows-8/16/Astrology-Year-Of-Monkey-icon.png';
            break;
    }

    return newBadge;
};

module.exports = {
    checkAndAddBadges,
    checkAndAddCohort,
    streakUpdater,
    newBadge
};


