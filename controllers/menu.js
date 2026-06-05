const Menu = require('../models/Menu');

async function HandleGetMenu(req, res) {
  try {
    const menuItems = await Menu.find();
    console.log("Fetched menu items:", menuItems);
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the menu items." });
  }
}

async function HandleAddMenuItem(req, res) {    
    try {
        const data = req.body;
        const newMenuItem = new Menu(data);
        await newMenuItem.save();
        res
          .status(201)
          .json({ message: "Menu item added successfully", menuItem: newMenuItem });
      } catch (error) {
        console.error("Error adding menu item:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding the menu item." });
      }
}

async function HandleDeleteMenuItem(req, res) {
    try {
        const { id } = req.params;
        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        if (!deletedMenuItem) {
            return res.status(404).json({ error: "Menu item not found." });
        }
        res.status(200).json({ message: "Menu item deleted successfully." });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res
          .status(500)
          .json({ error: "An error occurred while deleting the menu item." });
    }
}

module.exports = {
    HandleGetMenu,
    HandleAddMenuItem,
    HandleDeleteMenuItem,
};