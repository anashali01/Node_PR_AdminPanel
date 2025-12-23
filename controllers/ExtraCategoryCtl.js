import Category from "../models/categorySchema.js";
import ExtraCategory from "../models/ExtracategorySchema.js";
import fs from "fs";
import SubCategory from "../models/SubcategorySchema.js";
const ExtraCategoryCtl = {
    async addExtraCategoryPage(req, res) {
        let categories = await Category.find({});
        let Subcategories = await SubCategory.find({});
        return res.render('./pages/add-ExtraCategory.ejs', { categories, Subcategories });
    },
    async addExtraCategory(req, res) {
        try {
            req.body.image = req.file.path;
            let ExtraCategoryData = await ExtraCategory.create(req.body);
            console.log(ExtraCategoryData);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewExtraCategoryPage(req, res) {
        try {
            const ExtraCategories = await ExtraCategory.find({})
                .populate({
                    path: 'Subcategory',                    // field on ExtraCategory schema
                })
                .populate({ path: 'category' })    // field on Category schema
                // return res.json(ExtraCategories)
            return res.render("./pages/view-ExtraCategory", {
                ExtraCategories
            })
        } catch (error) {
            console.log(error.message);
            return res.render("./pages/view-ExtraCategory", {
                ExtraCategories: []
            })
        }
    },
    async deleteExtraCategory(req, res) {
        try {
            const { id } = req.params;

            const ExtraCategory = await ExtraCategory.findByIdAndDelete(id);
            fs.unlinkSync(ExtraCategory.image);
            console.log('Delete Done!');
            return res.redirect(req.get('Referrer') || '/');

        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');

        }
    },
    async editExtraCategoryPage(req, res) {
        try {
            const { id } = req.params;

            const categories = await Category.find({});
            const SubCategories = await SubCategory.find({});
            const Extracategory = await ExtraCategory.findById(id);

            res.render('./pages/editExtraCategory.ejs', {
                Extracategory,
                SubCategories,
                categories
            });
        } catch (error) {
            console.log(error.message);
            res.redirect(req.get('Referrer') || '/');
        }
    },
    async editExtraCategory(req, res) {
        try {
            const { id } = req.params;

            if (req.file) {
                req.body.image = req.file.path;
            }

            const Extracategory = await ExtraCategory.findByIdAndUpdate(id, req.body);

            console.log('Update!');

            if (req.file) {
                fs.unlinkSync(Extracategory.image);
            }

            return res.redirect('/view-ExtraCategory');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    }
}

export default ExtraCategoryCtl;