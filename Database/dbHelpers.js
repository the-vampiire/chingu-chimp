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
        const technologies = skills.technologies;
    const projects = profileDoc.projects;
    const totalCheckins = profileDoc.totalCheckins;

    if(certifications.length) badges = addCertificatationBadges(certifications, badges, 'name');

// // projects badges
//     switch(projects.length){
//
//     }
//
// // languages badges
//
// // check-ins badges
//     switch(totalCheckins){
//         case '250':
//         case '100':
//         case '50':
//         case '25':
//     }
//
// // activity streak badges
//     switch(bestStreak){
//         case '90':
//         case '60':
//         case '30':
//         case '21':
//         case '14':
//         case '7':
//     }

    return badges;
};

// checks an array against the user's badges. adds any missing badges the user has earned
addCertificatationBadges = (eachArray, badges, matchProperty) => {

    eachArray.forEach( eachE => {
        if(!badges.some( badge => badge[matchProperty] === eachE[matchProperty]))
            badges.unshift(newBadge(eachE[matchProperty]))
    });

    return badges;

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
                // newBadge.color = '';
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
                newBadge.color = '#fec901';
                break;
            case 'Back End Certification':
                newBadge.badgeType = 'certification';
                newBadge.name = 'Back End Certification';
                newBadge.url = 'http://i.imgur.com/mY5qQew.png';
                newBadge.color = '#009345';
                break;
            case 'Data Visualization Certification':
                newBadge.badgeType = 'certification';
                newBadge.name = 'Data Visualization Certification';
                newBadge.url = 'http://i.imgur.com/IoTeInz.png';
                newBadge.color = '#41778f';
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

// checks for an existing /  adds a new cohort
checkAndAddCohort = (cohorts, cohortName, teamID, userID) => {

// cohortName comes in in the form [cohort-name-style] and must be processed 
// to [Cohort Name Style] for comparison
    cohortName = cohortName.slice(cohortName.lastIndexOf('/')+1)
        .split('-')
        .map(word => word = `${word.slice(0,1).toUpperCase()}${word.slice(1)}`)
        .join(' ');

// if the passed match is not found in the array of then add the cohort
    if(!cohorts.some( e => e.cohortName === cohortName)){
        cohorts.push({ cohortName, teamID, userID });
    }

    return cohorts;
};

// updates the user's streak when checking in
streakUpdater = (checkins, currentStreak, bestStreak) => {

    if(currentStreak.value === 0 && bestStreak === 0) currentStreak.value++;

    const currentDate = Number(Date.now());

    if(currentDate - currentStreak.lastUpdate >= 86400000){

        const resetStreak = !checkins.some( checkin => {
            const sessionsArray = checkin.sessions;
            const lastDate = sessionsArray[sessionsArray.length - 1].date;

            if (currentDate - lastDate <= 129600000) {
                currentStreak.value++;
                return true;
            }
        });

        if(resetStreak) currentStreak.value = 1;
        
        currentStreak.lastUpdate = currentDate;
    }

    if (bestStreak < currentStreak.value) bestStreak = currentStreak.value;

    return {currentStreak, bestStreak};
};


module.exports = {
    checkAndAddBadges,
    checkAndAddCohort,
    streakUpdater,
    newBadge
};


