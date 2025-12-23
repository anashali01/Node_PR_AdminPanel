import UserModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";


let OTP = null;

const adminCtl = {
    dashboard(req, res) {
        return res.render('./index.ejs');
    },
    profilepage(req,res){
        return res.render('./pages/profilePage.ejs');
    },
    editProfilePage(req,res){
        return res.render('./pages/editProfilePage.ejs');
    },
    // ...existing code...
   // ...existing code...
    async editProfile(req, res) {
        try {
            let oneUser = res.locals.user;
            const updateData = { ...req.body };

            console.log('[editProfile] req.files:', req.files);
            console.log('[editProfile] req.body:', req.body);

            // handle profile image
            if (req.files && req.files.image && req.files.image.length > 0) {
                updateData.image = req.files.image[0].path;
                console.log('[editProfile] Profile image set to:', updateData.image);
            } else {
                console.log('[editProfile] No profile image file');
            }

            let dbUser = await UserModel.findByIdAndUpdate(oneUser.id, updateData, { new: true });
            console.log('[editProfile] User updated. Image:', dbUser.image, 'Banner:', dbUser.bannerImg);
            return res.redirect('/profilePage');
        } catch (error) {
            console.error('[editProfile] Error:', error.message);
            return res.redirect(req.get('Referrer') || '/editProfile');
        }
    },
// ...existing code...
// ...existing code...
    
}

export default adminCtl;