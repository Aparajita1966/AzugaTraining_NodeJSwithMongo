const MuseumModel = require('../model/museum')

// Create and Save a new museum
exports.create = async (req, res) => {
    if (!req.body.objectID && !req.body.isHighLight && !req.body.accessionNumber && !req.body.accessionYear) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const museum = new MuseumModel({
        objectID: req.body.objectID,
        isHighLight: req.body.isHighLight,
        accessionNumber: req.body.accessionNumber,
        accessionYear: req.body.accessionYear
    });
    
    await museum.save().then(data => {
        res.send({
            message:"Museum created successfully!!",
            museum:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating museum"
        });
    });
};

// Retrieve all museums from the database.
exports.findAll = async (req, res) => {
    try {
        const museum = await MuseumModel.find();
        res.status(200).json(museum);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single museum with an id
exports.findOne = async (req, res) => {
    try {
        const museum = await MuseumModel.findOne({"objectID": req.params.id}).exec();
        res.status(200).json(museum);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a museum by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    var myquery = { objectID: id };
    var newvalues = { $set: req.body };
    
    await MuseumModel.updateOne(myquery, newvalues, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Museum not found.`
            });
        }else{
            res.send({ message: "Museum updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a museum with the specified id in the request
exports.destroy = async (req, res) => {
    var myquery = { objectID: req.params.id};
    await MuseumModel.deleteOne(myquery).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Museum not found.`
          });
        } else {
          res.send({
            message: "Museum deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};