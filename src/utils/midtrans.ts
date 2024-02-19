const midtransClient = require("midtrans-client")

const serverKey: string = process.env.SERVER_KEY || "server_key"
const clientKey: string = process.env.CLIENT_KEY || "client_key"

const midtrans = midtransClient.Snap({
   isProduction: false,
   serverKey,
   clientKey
})