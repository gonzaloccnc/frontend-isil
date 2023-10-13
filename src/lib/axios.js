import axios from 'axios'

export const axiosServer = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const axiosSameServer = axios.create({
  baseURL: process.env.API_SAME_SITE,
  headers: { 'Content-Type': 'application/json' }
})

export const axiosClientSameServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SAME_SITE,
  headers: { 'Content-Type': 'application/json' }
})
