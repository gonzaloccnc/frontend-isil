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

      if (file.type !== 'application/pdf') {
        setFields(prev => ({ ...prev, [e.target.id]: { file: null, error: 'Archivo debe ser pdf' } }))
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
