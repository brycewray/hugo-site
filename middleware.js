import { next } from '@vercel/edge'

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

export default function middleware() {
	const nonce = generateNonce()
	return next({
		headers: {
			"x-test-header-from-middleware": '"' + nonce + '"'
		},
	})
}
