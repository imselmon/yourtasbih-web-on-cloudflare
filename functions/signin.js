export async function onRequest(context) {
                const { request, env } = context
                const url = new URL(request.url)
                const path = url.pathname


                if (request.method === 'POST' && path === '/signin') {
                    return handleLogin(request, env)
                }


                return new Response('Method Not Allowed' + JSON.stringify(context), { status: 405 })
            }

            async function handleLogin(request, env) {
                const { email, password } = await request.json()

                let USERS = env.USERS

                const user = await USERS.get(email)
                if (!user) {
                    return new Response('User not found', { status: 404 })
                }

                const { password: hashedPassword } = JSON.parse(user)
                const isValid = await verifyPassword(password, hashedPassword)
                if (!isValid) {
                    return new Response('Invalid credentials', { status: 401 })
                }

                return new Response(user,{ status: 200 })

            }

            async function hashPassword(password) {
                const encoder = new TextEncoder()
                const data = encoder.encode(password)
                const hash = await crypto.subtle.digest('SHA-256', data)
                return btoa(String.fromCharCode(...new Uint8Array(hash)))
            }

            async function verifyPassword(password, hashedPassword) {
                const hash = await hashPassword(password)
                return hash === hashedPassword
            }
