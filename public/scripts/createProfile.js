var app = new Vue({
  el: '#app',
  data: {
    // dom manipulation variables
    userCreated: false,
    todaysDate: '',
    userNameInUse: false,
    invalidUsername: false,
    
    // form input
    userData: {
      userName: '',
      joinDate: '',
      portfolio: '',
      gitHub: '',
      blog: '',
      story: '', // chingu slack intro
      cohorts: [],
      skills: {
        languages: [],
        frameworks: []
      },
      projects: [],
      certifications: []
    },

    // dropdown data
    cohorts: ["Ewoks", "Tapirs","Sloths", "Kiwis", "Platypus", "Bearded-Dragons", "Armadillos", "Red-Pandas", "Honey-Badgers", "Elephants", "Dolphins", "Pumas", "Llamas"],
    languages: ['JavaScript', 'Java', 'Python', 'Ruby', 'C++', 'C#.Net', 'Assembly', 'Bash', 'Basic', 'C', 'C#', 'Fortran', 'Go', 'MATLAB', 'Objective-C', 'Perl', 'PHP', 'Powershell', 'VBA'],
    frameworks:  ['jQuery', 'Bootstrap', 'Angular2/4', 'AngularJS', 'Electron', 'jQueryUI', 'React', 'React Native', 'Vue'],
    levels: ["Beginner", "Intermediate", "Expert", "Wizard"]
  },
  methods: {
    // populate new form field methods
    addNewCohort() {
      const defaultCohort = this.filteredCohorts[0]

      this.userData.cohorts.push({cohortName: defaultCohort})
    },
    addNewLanguage() {
      const defaultLanguage = this.filteredLanguages[0]
      const defaultSkillLevel = 'Intermediate'

      this.userData.skills.languages.push({name: defaultLanguage, level: defaultSkillLevel})
    },
    addNewFramework() {
      const defaultFramework = this.filteredFrameworks[0]
      const defaultSkillLevel = 'Intermediate'

      this.userData.skills.frameworks.push({name: defaultFramework, level: defaultSkillLevel})
    },
    addNewProject() {
      const completedAtDefault = this.todaysDate

      this.userData.projects.push({
        project: '',
        url: '',
        gitHub: '',
        completedAt: completedAtDefault
      })
    },
    addNewCertificate(certification) {
      const certCompletionDateDefault = this.todaysDate

      let certificationName
      switch(certification) {
        case 'front end':
          certificationName = 'Front End Certification'
          break
        case 'data visualization':
          certificationName = 'Data Visualization Certification'
          break
        case 'back end':
          certificationName = 'Back End Certification'
      }
      
      this.userData.certifications.push({
        name: certificationName,
        url: '',
        date: certCompletionDateDefault
      })
    },

    // prevents duplicate entries for language/cohort/framework
    disableEntry(item, itemArray) {
      return Boolean(!~itemArray.indexOf(item))
    },

    // form field validation methods
    validateGitHubUrl(url) {
      return /^https:\/\/github\.com\//.test(url) || url.length === 0 // last check prevents error being displayed on page load
    },
    validateFreeCodeCampUrl(url) {
      return /^https:\/\/www\.freecodecamp\.com\/[A-Za-z-]+\/[a-z]+\-[a-z]+\-(certification)/.test(url) || url.length === 0
    },
    
    // username validation properties
    usernameCheckHandler() {
      this.checkUserNameAvailability()
      this.followsSlackFormatting()
    },
    checkUserNameAvailability() {
      axios.post('/validate-userName', {userName: this.userData.userName})
        .then( response => this.userNameInUse = !response.data.userNameAvailable)
        .catch( err => console.log(err))
    },
    followsSlackFormatting() {
      const validUsernameChars = /^[a-z0-9.\-_]*$/

      this.invalidUsername = !(this.userData.userName.length <= 21 && validUsernameChars.test(this.userData.userName)) // 21 is slacks max length for a username
    },

    submitForm(event) {
      event.preventDefault()

      if(!this.inputIsValid()) return

      // convert all dates to unix timestamp
      this.userData.joinDate = new Date(this.userData.joinDate).getTime()
      for(let project of this.userData.projects) {
        project.completedAt = new Date(project.completedAt).getTime()
      }
      for(let certification of this.userData.certifications) {
        certification.date = new Date(certification.date).getTime()
      }
      
      axios.post('/create-profile', {userData: this.userData})
        .then(createdResponse => this.userCreated = createdResponse.data.userCreated)
    }
  },
  computed: {
    // prevet fcc cert duplication
    frontEndCertAdded() {
      return Boolean(~this.userData.certifications.findIndex( certification => certification.name === 'Front End Certification'))
    },
    dataVisCertAdded() {
      return Boolean(~this.userData.certifications.findIndex( certification => certification.name === 'Data Visualization Certification'))
    },
    backEndCertAdded() {
      return Boolean(~this.userData.certifications.findIndex( certification => certification.name === 'Back End Certification'))
    },

    // generates arrays that contain values that the user has not already chosen as a value in their data
    filteredCohorts() {
      let self = this
console.log(this.cohorts);
      return this.cohorts.filter(cohort => {
        for(const userCohortObj of self.userData.cohorts) {
          if(cohort === userCohortObj.cohortName) return false
        }
        return true
      })
    },
    filteredLanguages() {
      let self = this

      return this.languages.filter(language => {
        for(const userLanguageObj of self.userData.skills.languages) {
          if(language === userLanguageObj.name) return false
        }
        return true
      })
    },
    filteredFrameworks() {
      let self = this

      return this.frameworks.filter(framework => {
        for(const userFrameworkObj of self.userData.skills.frameworks) {
          if(framework === userFrameworkObj.name) return false
        }
        return true
      })
    },

    inputIsValid() {
      // username check
      if(this.userNameInUse || this.invalidUsername) return false

      // story check
        if(this.userData.story.length === 0) return false
      
      // github url checks
      if(!this.validateGitHubUrl(this.userData.gitHub) || this.userData.gitHub.length === 0) return false
      
      for(const project of this.userData.projects) {
        if(!this.validateGitHubUrl(project.gitHub) || project.gitHub.length === 0) return false
      }

      // fcc url checks
      for(const certification of this.userData.certifications) {
        if(!this.validateFreeCodeCampUrl(certification.url) || certification.url.length === 0) return false
      }

      return true
    },
  },
  created() {
    const today = new Date()
    const year = today.getFullYear()
    const month = `0${today.getMonth() + 1}`.slice(-2)
    const day = today.getDate()
    this.todaysDate = `${year}-${month}-${day}`
    this.userData.joinDate = this.todaysDate

    this.addNewCohort()
  }
})