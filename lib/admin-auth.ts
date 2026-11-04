import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE = 'admin_session'
const WEEK = 60 * 60 * 24 * 7

const sha = (text: string) => createHash('sha256').update(text).digest()
const sameText = (a: string, b: string) => timingSafeEqual(sha(a), sha(b))

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD)

export function passwordIsRight(input: string) {
  const password = process.env.ADMIN_PASSWORD
  return Boolean(password) && sameText(input, password!)
}

// The cookie holds a hash of the password, so changing ADMIN_PASSWORD signs everyone out.
const sessionValue = () => sha(`portfolio-admin:${process.env.ADMIN_PASSWORD}`).toString('hex')

export async function isAdmin() {
  if (!adminConfigured()) return false
  const value = (await cookies()).get(COOKIE)?.value
  return Boolean(value) && sameText(value!, sessionValue())
}

export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Not signed in')
}

export async function startSession() {
  ;(await cookies()).set(COOKIE, sessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: WEEK,
  })
}

export async function endSession() {
  ;(await cookies()).delete(COOKIE)
}
