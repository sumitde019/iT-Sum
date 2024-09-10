import foodModel from '../models/foodModel.js';
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    console.log('Request File:', req.file); // Check if file is being uploaded
    console.log('Request Body:', req.body); // Log incoming data

    const { name, description, price, category } = req.body;
    let image_filename = req.file ? req.file.filename : '';

    // Validate required fields
    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename
    });

    try {
        const savedFood = await food.save();
        console.log('Food saved:', savedFood);
        res.json({ success: true, message: 'Food Added' });
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).json({ success: false, message: 'Error saving food' });
    }
};


// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods || foods.length === 0) {
            return res.status(404).json({ success: false, message: 'No food items found' });
        }
        return res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error('Error fetching foods:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        const filePath = `uploads/${food.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food Removed' });
    } catch (error) {
        console.error('Error removing food:', error);
        res.json({ success: false, message: 'Error' });
    }
};

export { addFood, listFood, removeFood };
