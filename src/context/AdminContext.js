import { createContext } from 'react'

export const AdminContext = createContext({
  courses: null,
  contents: null,
  classes: null,
  getCourses: () => { },
  getContents: (idCourse) => { },
  setStoreCourses: (courseToSet) => { },
  setStoreCoursesInit: (init) => { },
  setStoreContents: (c) => { },
  getClasses: () => { },
  setStoreClasses: (c) => { },
  setStoreClassesInit: (init) => { }
})
