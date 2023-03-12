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
	const nonce = generateNonce()
	let response = await fetch(request)
	const html = (await response.text())
		.replace(
			'rel="stylesheet"',
			'rel="stylesheet nonce="' + nonce + '"'
		)
	return new Response(html, {
		status: response.status,
		statusText: response.statusText
	})
}
