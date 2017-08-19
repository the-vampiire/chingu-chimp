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

- Updating behaves similarly to git. 
- You build your command by passing a `profile item` and its associated [`-flag data`] pairs.

### General Form
- `/update <profile item> [ -flag data ]`

### List of Update Items
- `blog`, `certifications`, `gitHub`, `picture`, `portfolio`, `projects`, `skills`, `story`

### List of Update Flags
- `-date`, `-name`, `-repo`, `-url` All of the flags can also be written shorthand: `-d`, `-n`, `-r`, `-u`

type/format | string | mm/dd/yy | string | string
--- | --- | --- | --- | ---
 `-flag`| `-url` / `-u` | `-date` / `-d` | `-name` / `-n` | `-repo` / `-r`
**blog** |blog url||| 
**certifications** | certificate url | completion date || 
**gitHub** |GitHub profile url ||| 
**portfolio** | portfolio url ||| 
**projects** | project url | completion date | project name | GitHub repo url |

 **Note:** Dates are optional. If no date is passed then the current date is inserted.

 **Note:** Projects require at minimum a project name and GitHub repo link

### Updating Your Blog, GitHub Profile, or Portfolio URL

#### Example: `/update blog -url https://blogurl.com`

### Updating Free Code Camp Certficiations

#### Example: `/update certifications -url https://www.freecodecamp.com/userName/x-x-certification -date 01/01/11`

### Updating Profile Picture
The profile picture update command does not take any additional parameters. When the command is entered your current Slack profile picture will be saved and added to your Chingu profile card.

**Note:** The system is designed to update your profile picture automatically during the updating of any item - every 14 days. The `/update picture` command can be used to force an update at any time. 

#### Example: `/update picture`

### Updating Projects

flag | data
--- | ---
`-name` | `Project Name`
`-date` | `01/01/11`
`-repo` | `https://github.com/userName/repoName`
`-url` | `https://projecturl.com`

#### Example: `/update projects -n Project Name -d 01/01/11 -r https://github.com/userName/repoName -u https://projecturl.com`




