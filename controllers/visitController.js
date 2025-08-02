const visitService = require("../services/visitService");

async function getAllGuests(req, res) {
  try {
    const data = await visitService.getAllVisits();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
}

async function createGuest(req, res) {
  const { phone, name } = req.body;

  if (!phone || !name)
    return res.status(400).json({ message: "Введены не все поля" });

  const resultChange = {
    phone: phone,
    name: name,
    lastVisit: new Date(),
    countVisit: 1,
  };

  try {
    await visitService.createVisit(resultChange);
    return res.status(201).json(resultChange);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getGuestById(req, res) {
  try {
    const { guestId } = req.params;
    const currentGuest = await visitService.getVisitById(guestId);
    if (!currentGuest) return res.status(400).json("Гость не найден");
    return res.status(201).json(currentGuest);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function guestUpdate(req, res) {
  try {
    const { guestId } = req.params;
    const updateData = req.body;
    const currentGuest = await visitService.updateVisit(guestId, updateData);
    return res.status(200).json(currentGuest);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteGuest(req, res) {
  try {
    const { guestId } = req.params;
    const currentGuest = await visitService.getVisitById(guestId);
    await visitService.deleteVisit(guestId);
    return res.json(`Гость ${currentGuest.name} удален`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllGuests,
  createGuest,
  getGuestById,
  guestUpdate,
  deleteGuest,
};
