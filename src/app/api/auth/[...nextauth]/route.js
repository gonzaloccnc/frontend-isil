import { axiosServer } from '@/lib/axios'
import { verifyToken } from '@/lib/jwtUtils'
import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials, req) {
        try {
          const { data } = await axiosServer.post('/auth/login', {
            email: credentials.email,
            password: credentials.password
          })
          const payload = await verifyToken(data.token)
          return { ...payload, accessToken: data.token }
        } catch (ex) {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) {
        token.name = user.firstname + ' ' + user.surnames
        token.role = user.role
        token.picture = user.photo ?? null
        token.accessToken = user.accessToken
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      // datos que usara el front session
      if (session && token) {
        session.user = { ...token }
      }
      return session
    }

  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
})

export { handler as provider, handler as GET, handler as POST }
