let checkins = [
    {
        channelID : 'aa5',
        sessions : [{date : Number(Date.now())}]
    }
    ];

let currentStreak = -5;

checkins.some( checkin => {
    let lastDate = checkin.sessions[checkin.sessions.length-1].date;
    console.log(lastDate);
    let currentDate = Number(Date.now());
    console.log(currentDate);
    if(currentDate - lastDate <= 86400000){
        currentStreak++;
        return true;
    }else{
        currentStreak = 0;
    }
});

console.log(currentStreak);

