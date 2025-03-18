const model = require('../models/model');

// POST: http://localhost:8080/api/categories
async function create_Categories(req, res) {
    try {
        const newCategory = new model.Categories({
            type: "Savings",
            color: "#36A2EB"
        });

        const savedCategory = await newCategory.save();
        return res.json(savedCategory);

    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}
async function get_Categories(req, res) {
    try {
        let data = await model.Categories.find({})
        let filter= await data.map(v=>Object.assign({}, {type:v.type, color:v.color}));
        return res.json(filter);

    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}
async function create_Transaction(req,res){
    try {
        if(!req.body) return res.status(400).json('Post HTTP data not provided');
        let {name, type, amount}=req.body;

        const create=await new model.Transaction({
            name, type, amount, date:new Date()
        });
        const savedCategory = await create.save();
    return res.json(savedCategory);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating Transaction: ${err.message}` });
    }
}
async function get_Transaction(req, res) {
    try {
        let data = await model.Transaction.find({})
        return res.json(data);

    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}
async function delete_Transaction(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body not found" });
        }
        const deleted = await model.Transaction.deleteOne(req.body);
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "No matching transaction found" });
        }
        return res.json({ message: "Record deleted successfully!" });
    } catch (err) {
        return res.status(500).json({ message: "Error while deleting transaction record", error: err.message });
    }
}
async function get_Labels(req, res) {
    try {
        const result = await model.Transaction.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            {
                $unwind: "$categories_info"
            }
        ]);
        const data = result.map(v => ({
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info.color
        }));
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ message: "Lookup Collection Error", error: error.message });
    }
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels 
};
 