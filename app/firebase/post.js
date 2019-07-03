
const admin = {}// require('firebase-admin');

admin.initializeApp(functions.config().firebase)

const WEBHOOK_URL = 'http://requestb.in/1mqw97l1'

// Reads the content of the node that triggered the function and sends it to the registered Webhook
// URL.
exports.webhook = functions.database.ref('/hooks/{hookId}').onWrite(event => {
  return request({
    uri: WEBHOOK_URL,
    method: 'POST',
    json: true,
    body: event.data.val(),
    resolveWithFullResponse: true
  }).then(response => {
    if (response.statusCode >= 400) {
      throw new Error(`HTTP Error: ${response.statusCode}`)
    }
    console.log('SUCCESS! Posted', event.data.ref)
  })
})
