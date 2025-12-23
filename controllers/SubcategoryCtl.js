import Category from "../models/categorySchema.js";
import ExtraCategory from "../models/ExtracategorySchema.js";
import SubCategory from "../models/SubcategorySchema.js";
import fs from "fs";
const SubcategoryCtl = {
    async addSubCategoryPage(req, res){
        let categories = await Category.find({});
        return res.render('./pages/add-Subcategory.ejs',{categories});
    },
    async addSubCategory(req, res) {
        try {
            req.body.image = req.file.path;
            let SubcategoryData = await SubCategory.create(req.body);
            console.log(SubcategoryData);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewSubCategoryPage(req, res) {
        try {
            const ExtraCategories = await ExtraCategory.find({});
            const Subcategories = await SubCategory.find({}).populate('category');
            return res.render("./pages/view-Subcategory", {
                Subcategories,
                ExtraCategories
            })
        } catch (error) {
            console.log(error.message);
            return res.render("./pages/view-Subcategory", {
                categories: []
            })
        }
    },
    async deleteSubCategory(req, res) {
        try {
            const { id } = req.params;

            const Subcategory = await SubCategory.findByIdAndDelete(id);
            fs.unlinkSync(Subcategory.image);
            console.log('Delete Done!');
            return res.redirect(req.get('Referrer') || '/');

        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');

        }
    },
    async editSubCategoryPage(req, res) {
        try {
            const { id } = req.params;

            const categories = await Category.find({});
            const Subcategory = await SubCategory.findById(id);
            console.log(Subcategory);
            
            res.render('./pages/editSubCategory.ejs', {
                Subcategory,
                categories
            });
        } catch (error) {
            console.log(error.message);
            res.redirect(req.redirect('Referrer') || '/');
        }
    },
    async editSubCategory(req, res) {
        try {
            const { id } = req.params;

            if (req.file) {
                req.body.image = req.file.path;
            }

            const Subcategory = await SubCategory.findByIdAndUpdate(id, req.body);

            console.log('Update!');

            if (req.file) {
                fs.unlinkSync(Subcategory.image);
            }

            return res.redirect('/view-Subcategory');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    }
}

export default SubcategoryCtl;