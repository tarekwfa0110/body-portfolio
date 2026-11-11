import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE = 'admin_session'
const WEEK = 60 * 60 * 24 * 7
const WEEK_MS = WEEK * 1000

const sha = (text: string) => createHash('sha256').update(text).digest()
const sameText = (a: string, b: string) => timingSafeEqual(sha(a), sha(b))

/** Whether the admin password is configured. */
export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD)

/** Compare the supplied password against the configured one. */
export function passwordIsRight(input: string) {
  const password = process.env.ADMIN_PASSWORD
  return Boolean(password) && sameText(input, password!)
}

// The cookie carries an expiry timestamp plus a hash of the password and that
// expiry, so sessions are verifiable and expire after one week.
function issueSession() {
  const expiry = Date.now() + WEEK_MS
  const hash = sha(`portfolio-admin:${process.env.ADMIN_PASSWORD}:${expiry}`).toString('hex')
  return `${expiry}.${hash}`
}

/** Whether the current request has a valid, unexpired admin session. */
export async function isAdmin() {
  if (!adminConfigured()) return false
  const value = (await cookies()).get(COOKIE)?.value
  if (!value) return false
  const dot = value.indexOf('.')
  if (dot === -1) return false
  const expiry = Number(value.slice(0, dot))
  const hash = value.slice(dot + 1)
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false
  const expected = sha(`portfolio-admin:${process.env.ADMIN_PASSWORD}:${expiry}`).toString('hex')
  return sameText(hash, expected)
}

/** Throw when the current request is not an authenticated admin session. */
export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Not signed in')
}

/** Issue a new admin session cookie with a one-week expiry. */
export async function startSession() {
  ;(await cookies()).set(COOKIE, issueSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: WEEK,
  })
}

/** Clear the admin session cookie. */
export async function endSession() {
  ;(await cookies()).delete(COOKIE)
}