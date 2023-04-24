import Product from "../models/product.js";

export default class ProductController {
  //Lấy danh sách sản phẩm:
  static async getAllProduct(req, res) {
    try {
      const product = await Product.find();
      if (!product) {
        throw "error";
      }
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Lấy sản phẩm theo id:
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        throw "error";
      }
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Thêm sản phẩm:
  static async addProduct(req, res) {
    try {
      console.debug("Adding product...");
      const product = new Product({ ...req.body });
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Cập nhật thông tin sản phẩm:
  static async updateProduct(req, res) {
    try {
      console.debug("Updating Product...");
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found." });
      }
      return res.json(updatedProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  //Xóa sản phẩm:
  static async deleteProduct(req, res) {
    try {
      console.debug("Deleting Product...");
      const { id } = req.params;
      const deletedProduct = await Product.findOneAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.json(deletedProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}