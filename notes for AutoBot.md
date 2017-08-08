run python script in node using python-shell package

    python script needs
        import sys, json

    python output format: panda dataframe
        desired output: JSON

    node output format: JSON
        write a script to send the data into python on an interval




scoring

[ add other tags here ]
[H] - heavy weighting

    Chingu profile data

        certifications
            weigh each option

        [H] number of projects completed

        cohorts
            weigh by tier

        number of check-ins
            checkin streaks
            check-in to mentor sessions

        [H] helpfulness score in the community
                how is this defined?
                complaints? (tickets)


    slack data (AutoBot moderation)
        How to Gather:
        https://api.slack.com/events/message
            Real Time Data
                continuous counters
                    gather history and compare daily / interval deltas
                data visualization of Chingu RTD
                    an activity map of Chingu / specific cohorts


        number of *reactions* / message
            https://api.slack.com/events/reaction_added
            store the item
                update reactions counter per item
                // action if threshold reactions is met

        specific channels activity:
            activity counters:
                messages sent
                files shared

            help channel
            resource sharing
            community
            project managers

        team activity frequency


    BOTH TOGETHER
        how to score a user overall
            for pairings
            for cohort selection

        how to score a user based on activity



Automatic tasks

    near the end of cohorts take all the top users and message them
    about being a mentor

    New / returning users to Chingu Cohort
        Sorting Hat will provide the teams / team members
        AutoBot will then create a channel and insert the team members

    Monitoring channels
        user activity is low [team / other channel]
            message them to engage
                if no response then second message
                    decide whether to move / remove then
                        (generate a ticket and / or message chance with user name)
                            give details in the ticket/message about the user
                                data
                                previous contact attempts
                                    replies

                            chance makes final decision
                                bot moves / removes
            NEEDS:
                RTM data [counters]
                user score


Dashboard [admin]
    Front end and/or on the Slack app page
    display visual statistics
        global (all cohorts)
        per cohort
        per channel
        per team
        per user
    moderator methods
        add / move / remove users
        handle tickets
        view / export[formatted] most reacted message quotes for "heard around chingu"



Milestones










