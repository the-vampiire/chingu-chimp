# The Chingu Chimp
Made using the following technologies:
* Node.js 
    * Express 
    * Mongoose
* MongoDB
* [ValStringer](https://github.com/the-vampiire/valstringer)
* Slack API 

# What is the Chingu Chimp?

#### I created the Chimp to give members of Chingu a more visual sense of community and personal growth. The Chimp is a robust profile bot that lets users update, view, and share each others profiles and profile items all from within Slack. 

#### It also handles check-ins where users can keep track of personal, team, pair-programming, and accountability progress.  

# How does it work?
### There are three commands that handle all of the Chimp's duties: 

#### 1) The `/profile` command: lets users view and share profile cards and individual profile items

#### 2) The `/checkin` command: lets a user check-in themselves and any other partner(s) into a team meeting, pair-programming session, accountability session, or a self-checkin

#### 3) The `/update` command: lets the user update all of their profile items using a git-style inline interface

## The `/checkin` Command
The check-in command lets users keep track of their progress through a simple 15 second process in Slack. Users can check-in to team meetings, pair programming meetings, accountability buddy sessions, or as inviduals in a self-checkin. 

My goal for check-ins was a way to quantify a major part of Chingu members' progress within the community and their teams. When team members check-in together they can each add and share the record of their check-ins. Other members can view a user's check-ins as an indication of their ability and, most importantly, reliabilility. 

![Check-in command example gif](http://www.giphy.com/gifs/l3fzAPAPw5E1X8nV6)

### How it Works
Check-ins take place using an interactive message menu (a Slack dropdown menu). When a user selects the type of check-in a new menu of type related activities are returned to select from. 

Currently only pre-defined check-in types and activites can be chosen. You can add them as a comment to the [Types and Activities issue](https://github.com/the-vampiire/chingu-chimp/issues/36) on this repo and I will add them to the menus.  

That being said - according to the Slack API Team's Trello they will be releasing version 3 of interactive messages "in the neat future" which will enable text input into Slack app messages.

In the future when text inputs become available check-ins can become much more specific. Like git commit messages but for individual and team progress. 

At that point it would be nice to build a simple front end that could display check-ins "posts" for users to have a running log of all they have accomplished in Chingu. 

### Using the `/checkin` Command
### General form
- `/checkin [@partner] [@partner,N]`

Using the check-in command is simple - you call the command and pass any partners (or none for a self check-in) then follow the interactive menu form that is presented to provide details about the check-in.

All users that are tagged in the command will have the check-in processed on their behalf. The user calling the check-in command is always included in the check-in. 

### Calling a check-in for just yourself
#### Example: `/checkin`

### Calling a check-in for your team
#### Example: `/checkin @userName1 @userName2`

## The `/update` Command
This is a summary of the command. For a detailed help guide you can issue the `/update help` command in Slack 
- You build your command by passing a `profile item` and its associated [`-flag data`] pairs.

### General Form
- `/update <profile item> [ -flag data ]`

### List of Update Items
- `blog`, `certifications`, `gitHub`, `picture`, `portfolio`, `projects`, `skills`, `story`

### List of Update Flags
- `-date`, `-name`, `-repo`, `-url` 
- All of the flags can also be written shorthand: `-d`, `-n`, `-r`, `-u`

type/format | string | mm/dd/yy | string | string
--- | --- | --- | --- | ---
 `-flag`| `-url` / `-u` | `-date` / `-d` | `-name` / `-n` | `-repo` / `-r`
 Profile item | 
**blog** |blog url||| 
**certifications** | certificate url | completion date (optional) || 
**gitHub** |GitHub profile url ||| 
**portfolio** | portfolio url ||| 
**projects** | project url | completion date (optional) | project name (optional) | GitHub repo url |

 **Note 1:** Dates are optional. If no date is passed then the current date is inserted.

 **Note 2:** Projects require at minimum a project name and GitHub repo link

 **Note 3:** All urls must begin with `http(s)://` and are validated before being accepted and committed to the database. Certification urls are verified with Free Code Camp before being updated.  

### Updating Your Blog, GitHub Profile, or Portfolio URL

#### Example: `/update blog -url https://blogurl.com`

### Updating Free Code Camp Certficiations

#### Example: `/update certifications -url https://www.freecodecamp.com/userName/x-x-certification -date 01/01/11`

### Updating Profile Picture
The profile picture update command does not take any additional parameters. When the command is entered the user's current Slack profile picture will be saved and added to your Chingu profile card.

**Note:** The system is designed to update a user's profile picture automatically during the updating of any item - every 14 days. The `/update picture` command can be used to force an update at any time. 

#### Example: `/update picture`

### Updating Projects

flag | data
--- | ---
`-name` | `Project Name`
`-date` | `01/01/11`
`-repo` | `https://github.com/userName/repoName`
`-url` | `https://projecturl.com`

#### Example: `/update projects -n Project Name -d 01/01/11 -r https://github.com/userName/repoName -u https://projecturl.com`

### Updating Skills

Skills are broken down into three categories: languages, frameworks, and technologies. 

Entering the `/update skills` command will return a multi-part interactive message form where the user selects:
- `a skill category` --> `a skill name` --> `skill level`

### Updating a User Story

User stories can be updated by pasting or writing your user story after the `/update story` command. 
- **Note: Slack markdown / formatting can be preserved by copying from the "edit message" window of your user story message in the intro-stories channel**

#### Example: `/update story Paste your user story here with *bold* _italic_ and any other Slack supported markdown`

### Errors
**Feel free to mess up**

All erroneous commands and invalid inputs should return a useful error message to help guide you towards fixing the command. If you do not receive a specific and useful error message for your erroneous command you can raise an issue on this repo to have it fixed. 

