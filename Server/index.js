const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi there");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sanduncooray000:tJTmhIJkxt8ZdZ6X@cluster0.670yynr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const usersCollection = client.db("Inventory").collection("Users");
    const inventoryCollection = client.db("Inventory").collection("Stock");

    //User Registration
    app.post("/register", async (req, res) => {
      try {
        const data = req.body;
        const result = await usersCollection.insertOne(data);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });

    //User Login
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email });
        if (user) {
          if (password === user.password) {
            res.json({ success: true, message: "Login Success" , data: user.fname});
          } else {
            res.json({ success: false, message: "Incorrect password" });
          }
        } else {
          res.status(401).json({ success: false, message: "User not found" });
        }
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });
  } finally {
    // await client.close(); , data: user 
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server Up on ${port}`);
});
