# The Chingu Chimp

## What is the Chingu Chimp?

### I created the Chimp to give members of Chingu a more "tangible" sense of community and personal growth. The Chimp is a robust profile bot that lets users update, view, and share each others profiles and profile items. 

### It also handles check-ins where users can keep track of personal, team, pair-programming, and accountability progress.

### All of this has been designed to function seamlessly without ever having to leave the home of Chingu - our Slack Team cohorts.  

## How does it work?
### There are three commands that handle all of the Chimp's duties: 

#### 1) The `/update` command: lets the user update all of their profile items directly from Slack using a git-style inline interface

#### 2) The `/checkin` command: lets a user check-in themselves and any other partner(s) into a team meeting, pair-programming session, accountability session, or a self-checkin

#### 3) the `/profile` command: lets users view and share profile cards or specific profile items

## The `/update` command
The following is the help guide that is returned when a user issues the `/update help` command in Slack

>Updating behaves similarly to git. You build your command by passing a `profile item` and its associated [`-flag data`] pairs. 

> **List of Update Items:**

>`blog`, `certifications`, `gitHub`, `picture`, `portfolio`, `projects`, `skills`, `story`

> **List of Update Flags**

>`-date`, `-name`, `-repo`, `-url` All of the flags can also be written shorthand: `-d`, `-n`, `-r`, `-u`

**Updating Your Blog, GitHub Profile, or Portfolio**

