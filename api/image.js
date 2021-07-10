let multiparty = require("multiparty");

module.exports = (req, res) => {
  if (req.method === "POST") {
    let form = new multiparty.Form();
    form.parse(req, (_err, _fields, files) => {
      res.json({
        files: files
      })
    });
    return;
  };
};
