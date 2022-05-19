const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db");
const http = require("http");
const multer = require("multer");
const { s3Upload } = require("./config/s3Service");

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

  app.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  });

  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  };

  const upload = multer({ storage, fileFilter });

  app.post("/uploads", upload.single("file"), async (req, res) => {
    try {
      const results = await s3Upload(req.file);
      res.send({
        status: true,
        message: "File is uploaded",
        imageUrl: results.Location,
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.use(cors());
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(express.static("uploads"));

  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File is too large",
        });
      }

      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "File must be an image",
        });
      }
    }
  });

  await connectDB();

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready`);
}

startServer();
