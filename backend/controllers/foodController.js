import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item
const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try{
        await food.save();
        res.json({success:true, message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods || foods.length === 0) {
            return res.status(404).json({ success: false, message: "No food items found" });
        }
        return res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error('Error fetching foods:', error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood, listFood, removeFood}


// not working 4hr 9min