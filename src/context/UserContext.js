const { createContext } = require('react')

export const UserContext = createContext({
  role: null,
  classes: [],
  contents: [],
  complementaries: [],
  evaluaions: [],
  fetchClasses: () => { },
  fetchComplementaries: () => { },
  fetchEvaluations: () => { },
  settingComplementaries: (compl) => { },
  setAllComplementaries: (data) => { },
  deleteComplementaries: (idCompl) => { }
})
