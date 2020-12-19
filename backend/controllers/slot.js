const Slot = require("../models/slot");
exports.addSlot = (req, res) => {
    const slot = new Slot(req.body);
    slot.save()
        .then(savedSlot => {
            res.status(201).json({message: "slot added", slot: savedSlot});
        })
        .catch(error => res.status(400).json(error));
};