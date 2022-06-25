const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require("mongodb")

const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("ema john server running")
})

//----------- connect mongoDB -----------//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.woosd.mongodb.net/?retryWrites=true&w=majority`
// console.log(uri)

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

async function run() {
  try {
    await client.connect()
    const database = client.db("EmaJohn")
    const productCollection = database.collection("products")
    const ordersCollection = database.collection("orders")

    // get api //
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({})
      const products = await cursor.toArray()

      res.send(products)
    })

    // post orders //
    app.post("/orders", async (req, res) => {
      const order = req.body
      console.log(order)
      res.send("procced")
    })
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log("runnig at port", port)
})
