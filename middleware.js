function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2)
}

function generateNonce() {
  const arr = new Uint8Array(12)
  crypto.getRandomValues(arr)
  const values = Array.from(arr, dec2hex)
  return [
    btoa(values.slice(0, 5).join("")).substr(0, 14),
    btoa(values.slice(5).join("")),
  ].join("/")
}

export default async function handleRequest(request) {
	try { // try-catch so a function crash doesn't crash the site
		let response = await fetch(request)

		let newHeaders = new Headers(response.headers)
		newHeaders.set("Cache-Control", "public, max-age=0")
		// newHeaders.set("Permissions-Policy", "interest-cohort=()")
		newHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
		newHeaders.set("X-Frame-Options", "SAMEORIGIN")
		newHeaders.set("X-Content-Type-Options", "nosniff")
		newHeaders.set("Referrer-Policy", "no-referrer, strict-origin-when-cross-origin")
		newHeaders.set("x-nonce-generator", "HIT")

		return new Response(html, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders
		})
	} catch (error) {
		console.log(error)
	}
}
