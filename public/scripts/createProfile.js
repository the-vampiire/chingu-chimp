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
    cohorts: [
        {
          "name": "Ewoks",
        },
        {
          "name": "Tapirs",
        },
        {
          "name": "Sloths",
        },
        {
          "name": "Kiwis",
        },
        {
          "name": "Platypus",
        },
        {
          "name": "Bearded-Dragons",
        },
        {
          "name": "Armadillos",
        },
        {
          "name": "Red-Pandas",
        },
        {
          "name": "Honey-Badgers",
        },
        {
          "name": "Elephants",
        },
        {
          "name": "Dolphins",
        },
        {
          "name": "Pumas",
        },
        {
          "name": "Llamas",
        }
      ],
      languages: ['JavaScript', 'Java', 'Python', 'Ruby', 'C++', 'C#.Net', 'Assembly', 'Bash', 'Basic', 'C', 'C#', 'Fortran', 'Go', 'MATLAB', 'Objective-C', 'Perl', 'PHP', 'Powershell', 'VBA'],
      frameworks:  ['jQuery', 'Bootstrap', 'Angular2/4', 'AngularJS', 'Electron', 'jQueryUI', 'React', 'React Native', 'Vue'],
      levels: [
        "Beginner",
        "Intermediate",
        "Expert",
        "Wizard"
      ]
  },
  methods: {
    // populate new form field methods
    addNewCohort() {
      const defaultCohort = this.cohorts[0].name;

      this.userData.cohorts.push({cohortName: defaultCohort});
    },
    addNewLanguage() {
      const defaultLanguage = this.languages[0]
      const defaultSkillLevel = 'Intermediate'

      this.userData.skills.languages.push({name: defaultLanguage, level: defaultSkillLevel})
    },
    addNewFramework() {
      const defaultFramework = this.frameworks[0]
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
          break;
        case 'data visualization':
          certificationName = 'Data Visualization Certification'
          break;
        case 'back end':
          certificationName = 'Back End Certification'
      }
      
      this.userData.certifications.push({
        name: certificationName,
        url: '',
        date: certCompletionDateDefault
      })
    },

    // form field validation methods
    validateGitHubUrl(url) {
      return url.startsWith('https://www.github.com/') || url.length === 0
    },
    validateFreeCodeCampUrl(url) {
      return url.startsWith('https://www.freecodecamp.com/') || url.length === 0
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
    
    // form submission
    submitForm(event) {
      event.preventDefault()

      if(this.userNameInUse) return

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
    }
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