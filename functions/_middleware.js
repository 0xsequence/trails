export async function onRequest(context) {
  const { request, env, next } = context

  // Check if authentication is required (both env vars must exist)
  const authRequired = env.DEMO_USERNAME && env.DEMO_PASSWORD

  // If authentication is not required, skip auth and continue
  if (!authRequired) {
    return next()
  }

  // Get the authorization header from the request
  const auth = request.headers.get("Authorization")

  // If no authorization header is present, prompt for credentials
  if (!auth) {
    return createAuthResponse("Authentication required")
  }

  // Split the auth header to get the encoded credentials
  const [scheme, encoded] = auth.split(" ")

  // Validate it's using Basic auth
  if (!encoded || scheme !== "Basic") {
    return createAuthResponse("Invalid authentication")
  }

  // Decode the Base64 credentials
  const decoded = atob(encoded)
  const [username, password] = decoded.split(":")

  // Validate credentials against environment variables
  const isValidCredentials =
    username === env.DEMO_USERNAME && password === env.DEMO_PASSWORD

  if (!isValidCredentials) {
    return createAuthResponse("Invalid credentials")
  }

  // If authentication passes, continue to the requested page
  return next()
}

/**
 * Creates a standardized authentication response
 * @param {string} message - Error message to display
 * @returns {Response} HTTP 401 response with Basic auth headers
 */
function createAuthResponse(message) {
  return new Response(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  })
}
