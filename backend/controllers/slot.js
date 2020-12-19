const { exists } = require("../models/slot");
const Slot = require("../models/slot");
exports.addSlot = (req, res) => {
    const slot = new Slot(req.body);
    slot.save()
        .then(savedSlot => {
            res.status(201).json({message: "slot added", slot: savedSlot});
        })
        .catch(error => res.status(400).json(error));
};

exports.updateSlot = (req, res) => {
    Slot.findOneAndUpdate(
        { _id: req.params.id },
        {...req.body, _id: req.params.id },
        {useFindAndModify: false, new: true}
    )
        .then(mongoRes => {
            if (mongoRes)
                res.status(200).json({message: "slot modified", slot: mongoRes});
            else
                res.status(400).json({error: "slot not found"});
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.deleteSlot = (req, res) => {
    Slot.deleteOne({ _id: req.params.id })
        .then((response) => {
            if (response.deletedCount === 1) 
                res.status(200).json({ message: "slot deleted !", response: response});
            else
                res.status(404).json({ error: "slot not found", response: response });
        })
        .catch(error => res.status(404).json({ error: error.message }));

};

exports.getSlotById = (req, res) => {
    Slot.findOne({ _id: req.params.id })
        .then(slot => {
            if (slot) {
                res.status(200).json(slot);
            } else {
                res.status(404).json({error: "user not found"});
            }
        })
        .catch(error => res.status(500).json(error));

};