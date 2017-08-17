/**
 * Created by Vampiire on 7/4/17.
 *
 *
 * FOR ADDITIONAL SECURITY
 *      get list of all chingu team names (team ID's) and add them to the slash verify function
 *      to check alongside the slack token. ensures all requests only occur between chingu teams and bot
 *
 *      // userid: U5XJSS683, username: vampiire
 *      // teamid: T5YFJ3Y7Q, team name: test team
 *
 */

slash = (tokenID, team = null) => {

    // expand to include all the available Chingu team ID's in an array
    // to check alongside the tokenID

    // const authorizedTeamIDs = [];
        // have this stored in a database that AutoBot can update
        // call it in here to always have the most up to date list
    const token = process.env.slack_verification;

    return tokenID === token;
};


module.exports = {
    slash : slash
};