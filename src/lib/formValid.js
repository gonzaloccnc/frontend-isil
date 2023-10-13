const rgxEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
const rgxNames = /^[a-zA-Z]+\s[a-zA-Z]+$/
const rgxDni = /^[0-9]+$/
const rgxURL = /^https:\/\/[^\s/$.?#].[^\s]*$/

export const validEmail = (email) => {
  if (email === '') return false
  return !rgxEmail.test(email)
}

export const validPassword = (password) => {
  if (password === '') return false
  return password.length < 8
}

export const validNames = (names) => {
  if (names === '') {
    return false
  }
  return !(rgxNames.test(names) && names.length >= 8)
}

export const validDNI = (dni) => {
  if (dni === '') return false
  return !(rgxDni.test(dni) && dni.length === 8)
}

export const deleteChars = cadena => {
  const tildes = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U'
  }

  return cadena.replace(/[áéíóúÁÉÍÓÚ]/g, l => tildes[l] || l)
}

export const validBetween = (credits, min, max) => {
  if (credits === '') return false
  return !(credits >= min && credits <= max)
}

export const validtTextarea = (text, max, min) => {
  if (text === '') return false
  return (text.length < min || text.length > max)
}

export const validUrl = (url) => {
  if (url === '') return false
  return !rgxURL.test(url)
}

export const validPhone = (phone) => {
  if (phone === '') return false
  return !(phone.length === 9)
}
