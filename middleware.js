/* ====================================

headers handling . . .
based on https://stackoverflow.com/questions/11560101/caching-json-with-cloudflare/56069077#56069077
as of 2021-05-01

nonce for CSP . . .
based on https://github.com/moveyourdigital/cloudflare-worker-csp-nonce
as of 2021-08-25

Also useful . . .
https://gist.github.com/RiFi2k/c3c65d59ca7f225e1d7d56929e0275ad
as of 2021-10-17

==================================== */

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
	try { // try-catch so a function crash doesn't crash the site
		let response = await fetch(request)

		const html = (await response.text())
			.replace(/DhcnhD3khTMePgXw/gi, nonce)
			.replace(
				'rel="stylesheet"',
				`rel="stylesheet" nonce="${nonce}"`
			)
			.replace(/<link rel="preload"/g, `<link nonce="${nonce}" rel="preload"`)
			.replace(
				'guitar-thriving.brycewray.com/script.js"',
				`guitar-thriving.brycewray.com/script.js" nonce="${nonce}"`
			)
			.replace(
				'src="/assets/js/lite-yt-embed_',
				`nonce="${nonce}" src="/assets/js/lite-yt-embed_`
			)
			.replace(/<style/g, `<style nonce="${nonce}"`)

		let newHeaders = new Headers(response.headers)
		// newHeaders.set("Permissions-Policy", "interest-cohort=()")
		newHeaders.set("Content-Security-Policy", `base-uri 'self' https://*.brycewray.com; connect-src 'self' https://*.brycewray.com https://*.cloudinary.com https://*.cloudflareinsights.com https://cloudflareinsights.com https://*.ytimg.com https://*.youtube-nocookie.com https://*.fosstodon.org https://*.mastodon.social https://*.mstdn.social; default-src 'self'; frame-ancestors 'self' https://*.brycewray.com https://*.youtube-nocookie.com; font-src 'self' https://*.brycewray.com data:; form-action 'self'; frame-src 'self' https://*.brycewray.com https://*.youtube-nocookie.com; img-src 'self' https://*.brycewray.com https://*.cloudinary.com https://*.ytimg.com https://*.youtube-nocookie.com https://*.twimg.com https://*.fosstodon.org https://*.mastodon.social https://*.mstdn.social https://*.google.com https://translate.googleapis.com data:; media-src 'self' https://*.brycewray.com https://*.cloudinary.com https://*.ytimg.com https://*.youtube-nocookie.com https://*.twimg.com https://*.fosstodon.org https://*.mastodon.social https://*.mstdn.social data:; object-src 'none'; script-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval'; script-src-elem 'self' 'nonce-${nonce}'; style-src 'self' https://*.brycewray.com https://*.youtube-nocookie.com data: https://*.google.com https://translate.googleapis.com 'nonce-${nonce}'; report-uri https://brycewray.report-uri.com/r/d/csp/reportOnly;`)
		newHeaders.set("Report-To", "{'group':'default','max_age':31536000,'endpoints':[{'url':'https://brycewray.report-uri.com/a/d/g'}],'include_subdomains':true}")

		return new Response(html, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders
		})
	} catch (error) {
		console.log(error)
	}
}
