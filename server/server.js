const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db");
const uploadFile = require("./controllers/fileUpload");
const http = require("http");

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use(
    fileUpload({
      createParentPath: true,
    })
  );

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(express.static("uploads"));

  app.post("/upload-avatar", uploadFile);
  app.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  });
  await connectDB();

  // app.listen(PORT, () => console.log("Server running on port 4000"));
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
}

startServer();
