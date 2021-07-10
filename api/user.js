module.exports = (req, res) => {
  if (req.method === "GET") {
    res.json({
      msg: "Hello World",
    });
  }
};
