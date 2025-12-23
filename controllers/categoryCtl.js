import Category from "../models/categorySchema.js";
import fs from "fs";
import SubCategory from "../models/SubcategorySchema.js";
const categoryCtl = {
    addCategoryPage(req, res) {
        return res.render('./pages/add-category.ejs');
    },
    async addCategory(req, res) {
        try {
            req.body.image = req.file.path;
            let categoryData = await Category.create(req.body);
            console.log(categoryData);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewCategoryPage(req, res) {
        try {
            const SubCategories = await SubCategory.find({});
            const categories = await Category.find({});
            
            return res.render("./pages/view-category", {
                categories,
                SubCategories
            })
        } catch (error) {
            console.log(error.message);
            return res.render("./pages/view-category", {
                categories: []
            })
        }
    },
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;

            const category = await Category.findByIdAndDelete(id);
            fs.unlinkSync(category.image);
            console.log('Delete Done!');
            return res.redirect(req.get('Referrer') || '/');

        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');

        }
    },
    async editCategoryPage(req,res){
        try {
            const {id} = req.params;

            const category = await Category.findById(id);

            res.render('./pages/editCategory.ejs',{
                category
            });
        } catch (error) {
            console.log(error.message);
            res.redirect(req.redirect('Referrer') || '/');
        }
    },
    async editCategory(req,res){
        try {
            const {id} = req.params;

            if(req.file){
                req.body.image = req.file.path;
            }

            const category = await Category.findByIdAndUpdate(id,req.body);

            console.log('Update!');
            
            if(req.file){
                fs.unlinkSync(category.image);
            }

            return res.redirect('/view-category');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    }
}

export default categoryCtl;