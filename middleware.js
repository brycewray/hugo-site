import { next } from '@vercel/edge'

export default function middleware() {
	return next({
		headers: {
			'x-test-header-from-middleware': 'true'
		},
	})
}
