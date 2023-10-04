import { createContext } from 'react'

export const AdminContext = createContext({
  courses: null,
  contents: null,
  getCourses: () => { },
  getContents: (idCourse) => { }
})
