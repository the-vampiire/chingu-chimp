const milestoneSchema = {
    tier: { type: Number, default: 0 },
    act: String,
    name: String,
    date: { type: Number, default: Date.now() },
    partners: [String]
  }

module.exports = {
    cohort: {
        slackID: String,
        name: String
    },

    team: {
        slackID: String,
        name: String
    },

    milestones:[milestoneSchema]
}
