const { v4 } = require("uuid");

const uploadFile = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let avatar = req.files.avatar;
      const sliced = avatar.name.split(".");
      const name = `${sliced[0]}${v4()}.${sliced[1]}`;
      avatar.mv("./uploads/" + name);
      const url = `${req.protocol}://${req.hostname}/${name}`;
      res.send({
        status: true,
        message: "File is uploaded",
        imageUrl: url,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = uploadFile;
