export const config = {
	runtime: 'edge',
}

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
const nonce = generateNonce()

export default async function handler(req) {
	return new Response (
		JSON.stringify({
			message: 'Hello, world!',
		}),
		{
			status: 200,
			headers: {
				'content-type': 'application/json',
				'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
				'x-nonce-test': "'" + nonce + "'",
			},
		}
	)
}
