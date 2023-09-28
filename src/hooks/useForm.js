import { useState } from 'react'

export const useForm = (obj) => {
  const [fields, setFields] = useState(obj)

  const changeFields = (e) => {
    setFields(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const changeCheckBox = e => {
    setFields(prev => ({ ...prev, checked: e }))
  }

  const clearInput = key => {
    setFields(prev => ({ ...prev, [key]: '' }))
  }

  return {
    fields,
    changeFields,
    changeCheckBox,
    clearInput
  }
}
