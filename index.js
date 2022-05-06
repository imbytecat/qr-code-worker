const qr = require('qr-image')

/**
 * Generates a @returns {Response} with
 * a QR image encoded in PNG
 * @param {Request} request
 */
const generate = async request => {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text') ? searchParams.get('text') : ''

  const qrImage = qr.imageSync(text || 'Empty content')

  const headers = { 'Content-Type': 'image/png' }
  return new Response(qrImage, { status: 200, headers })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with a QR image or 405 Method Not Allowed
 * @param {Request} request
 */
async function handleRequest(request) {
  let response

  response = await generate(request)

  return response
}
