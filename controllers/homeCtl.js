import Product from "../models/productSchema.js"

const homeCtl = {
    async homepage(req, res) {
        try {
            const product = await Product.find({})
            return res.render('../views/pages/homepage.ejs', {
                product
            })
        } catch (error) {
            console.log(error.message);
            return res.render('../views/pages/homepage.ejs', {
                product : []
            })
        }
    }
}

export default homeCtl