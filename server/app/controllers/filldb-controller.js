const fillDataBaseData = require("../utils/fillingDatabase");

class FilldbController {
  async fillDataBase(req, res, next) {
    try {
      await fillDataBaseData();
      return res.json("Успешно!")
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FilldbController();
