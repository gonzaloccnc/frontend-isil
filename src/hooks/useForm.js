import { useState } from 'react'

export const useForm = (obj) => {
  const [fields, setFields] = useState(obj)

  const changeFields = (e) => {
    if (e.target.id.startsWith('file')) {
      const file = e.target.files[0]

      if (e.target.files.length === 0) {
        setFields(prev => ({ ...prev, [e.target.id]: { file: null, error: 'Archivo no deber ser vacios' } }))
        return
      }
      console.log(file.accept)
      if (!e.target.accept.includes(file.type)) {
        console.log(e.target.accept.includes(file.type))
        setFields(prev => ({ ...prev, [e.target.id]: { file: null, error: 'Archivo incorrecto' } }))
        return
      }

      setFields(prev => ({ ...prev, [e.target.id]: { file, error: null } }))
      return
    }
    setFields(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const changeCheckBox = e => {
    setFields(prev => ({ ...prev, checked: e }))
  }

  const clearInput = key => {
    setFields(prev => ({ ...prev, [key]: '' }))
  }

  const clearAll = (obj) => {
    setFields(obj)
  }

  return {
    fields,
    changeFields,
    changeCheckBox,
    clearInput,
    clearAll
  }
}
