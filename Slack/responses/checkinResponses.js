/**
 * Created by Vampiire on 8/9/17.
 */

const val = require('../tools/valStringer');

checkinResponse = () => {
    return {
        response_type: 'in_channel',
        text: "Check In \nUse the following interactive message sequence to define and check-in to your activity."
    };
};

activitySelect = valueObject => {

    const menuItems = ['Pair Programming', 'Team Meeting', 'Self Check-in', 'Accountability'];

    const response = checkinResponse();
    response.attachments = [val.menu( null, valueObject, menuItems, 'Select a check-in type', 'activitySelect', 'kind')];

    return response;

};

taskSelect = valueObject => {

    let menuItems;

    switch(JSON.parse(valueObject).kind){
        case 'Pair Programming':
            menuItems = ['Code Wars', 'Tutorial', 'FCC Algorithms', 'Project', 'Other'];
            break;
        case 'Team Meeting':
        case 'Self Check-in':
            menuItems = ['Brainstorming', 'Planning', 'Adding new features', 'Bug-fixing', 'Refactoring', 'Other'];
            break;
        case 'Accountability':
            menuItems = ['Catching up', 'Setting goals', 'Reviewing code', 'Other'];
            break;
    }

    const response = checkinResponse();
    response.attachments = [val.menu( null, valueObject, menuItems, 'Select a task', 'taskSelect', 'task')];

    return response;
};

submitCheckin = valueObject => {
    valueObject = JSON.parse(valueObject);
    const partners = valueObject.partners;

    let kind = valueObject.kind;
    switch(valueObject.kind){
        case 'Accountability':
        case 'Pair programming':
            kind = `${kind} session`;
            break;
    }

    let partnerString = ``;
    partners.forEach( (partner, index) => {
        if(partners.length === 1) partnerString += `@${partner}`;
        else if(index === partners.length-1) partnerString += `and @${partner}`;
        else partnerString += `@${partner} `;
    });

    return val.submit(valueObject, 'checkin', true, true,
        `Check-in to *${kind}* to work on *${valueObject.task.toLowerCase()}*\nCheck-in will be processed for: *${partnerString}*`);
};

module.exports = {
    checkinResponse,
    activitySelect,
    taskSelect,
    submitCheckin
};
