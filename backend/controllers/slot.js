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