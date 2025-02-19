export async function onRequest(context, env) {
  const { request } = context
  let envr = context.env
  const url = new URL(request.url)
  const path = url.pathname

  if (request.method === 'POST' && path === '/register') {
    return handleSignup(request, envr)
  }

  return new Response('Method Not Allowed' + JSON.stringify(ENVR), { status: 405 })
}

async function handleSignup(request, envr) {
  const { name, email, password } = await request.json()

  let USERS = envr.USERS

  const user = await USERS.get(email)
  if (user) {
    return new Response('User already exists', { status: 400 })
  }

  const hashedPassword = await hashPassword(password)
  await USERS.put(email, JSON.stringify({ name, email, password: hashedPassword }))

  return new Response('User created', { status: 201 })
}

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}
