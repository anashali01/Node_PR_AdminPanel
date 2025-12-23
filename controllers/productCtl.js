import Category from "../models/categorySchema.js";
import ExtraCategory from "../models/ExtracategorySchema.js";
import Product from "../models/productSchema.js";
import SubCategory from "../models/SubcategorySchema.js";
import fs from "fs";
const productCtl = {
    async addProductPage(req, res) {
        try {
            const categories = await Category.find({});
            const Subcategories = await SubCategory.find({});
            const Extracategories = await ExtraCategory.find({});

            return res.render('./pages/add-product.ejs', {
                categories,
                Subcategories,
                Extracategories
            })
        } catch (error) {
            console.log(error.message);

            return res.render('./pages/add-product.ejs', {
                categories: [],
                Subcategories: [],
                Extracategories: []
            })
        }
    },
    async addProduct(req, res) {
        try {
            req.body.image = req.file.path;
            await Product.create(req.body);
            console.log('Product Add!');

            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewProductPage(req, res) {
        try {
            let products = await Product.find({}).populate('ExtraCategory').populate('Subcategory').populate('category');
            // console.log(products);
            
            res.render('./pages/viewProductPage.ejs', {
                products
            });
        } catch (error) {
            console.log(error.message);
            res.render('./pages/viewProductPage.ejs', {
                products: []
            });

        }
    },
    async deleteProducts(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findByIdAndDelete(id);
            fs.unlinkSync(product.image);
            console.log('Delete Done!');
            return res.redirect(req.get('Referrer') || '/');

        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');

        }
    },
    async editProductsPage(req, res) {
        try {
            const { id } = req.params;

            const categories = await Category.find({});
            const Subcategories = await SubCategory.find({});
            const Extracategories = await ExtraCategory.find({});
            const product = await Product.findById(id);

            res.render('./pages/editProductPage.ejs', {
                product,
                Extracategories,
                Subcategories,
                categories
            });
        } catch (error) {
            console.log(error.message);
            res.redirect(req.redirect('Referrer') || '/');
        }
    },
    async editProduct(req, res) {
        try {
            const { id } = req.params;

            if (req.file) {
                req.body.image = req.file.path;
            }

            const product = await Product.findByIdAndUpdate(id,req.body , {new : true , runValidators: true});
            console.log(product);
            
            console.log('Update!');

            if (req.file) {
                fs.unlinkSync(product.image);
            }

            return res.redirect('/view-product');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    }
}

export default productCtl;