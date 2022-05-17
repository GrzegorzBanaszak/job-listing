const uploadFile = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let avatar = req.files.avatar;
      // avatar.mv("./uploads/" + avatar.name);
      const url = `${req.protocol}://${req.host}/${avatar.name}`;
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
