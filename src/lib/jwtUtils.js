import { jwtVerify } from 'jose'

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return payload
  } catch (ex) {
    throw new Error('Token expirado o invalido')
  }
}
