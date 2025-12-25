import UserModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import fs from "fs";

let OTP = null;


const authCtl = {
    signupUserPage(req, res) {
        return res.render('./pages/signup');
    },
    async signupUser(req, res) {
        try {
            const { password, confirmPassword } = req.body;

            if (password != confirmPassword) {
                req.flash('error', 'Password Wrong!');
            }
            let hashPass = await bcrypt.hash(password, 10);
            req.body.password = hashPass;
            const user = await UserModel.create(req.body);
            user.save()
            res.redirect('/login');
        } catch (error) {
            console.log(error.message);
        }
    },
    loginUserPage(req, res) {
        return res.render('./pages/login.ejs');
    },
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            let user = await UserModel.findOne({ username });
            if (!user) {
                req.flash('error', 'User Not Found!');
                return res.redirect('/login');
            }

            let isValid = bcrypt.compare(password, user.password);

            if (!isValid) {
                req.flash('error', 'Password Wrong!');
                return res.redirect('/login')
            }

            req.flash('success', 'Login Successful!');
            res.cookie('ID', user.id);
            res.cookie('Role', user.role);
            return res.redirect('/');

        } catch (error) {
            console.log(error.message);
            return res.redirect('/login');
        }
    },
    logout(req, res) {
        res.clearCookie(
            'ID','Role'
        );
        return res.redirect('/login');
    },
    changePasswordPage(req, res) {
        return res.render('./pages/changePassword.ejs');
    },
    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword, confirmPassword } = req.body;

            const { ID } = req.cookies;

            let user = await UserModel.findById(ID);
            let isValid = await bcrypt.compare(currentPassword, user.password);

            if (isValid) {
                if (newPassword == confirmPassword) {
                    user.password = await bcrypt.hash(newPassword, 10);
                    await user.save();
                    return res.redirect('/login');
                } else {
                    req.flash('error', "Password Doesn't Match !");
                    return res.redirect(req.get('Referrer') || '/');
                }
            } else {
                req.flash('error', 'Password Is Invalid');
                return req.redirect(req.get('Referrer') || '/');
            }
        } catch (error) {
            console.log(error.message);

            console.log(`Error occurred !`);
        }
    },
    emailPage(req, res) {
        return res.render('./pages/email');
    },
    async email(req, res) {
        try {
            const { email } = req.body;

            let user = await UserModel.findOne({ email });

            if (user) {
                const payload = {
                    id: user._id
                }

                OTP = Math.floor(1000 + (Math.random() * 9999));

                console.log(OTP);


                const token = await jwt.sign(payload, 'dax');
                res.cookie('token', token);

                const transporter = nodemailer.createTransport({
                    service: email,
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "saiyedanashali@gmail.com",
                        pass: "rjdxmrhjjqiwvoav",
                    },
                });

                const info = await transporter.sendMail({
                    from: '<saiyedanashali@gmail.email>',
                    to: user.email,
                    subject: "Zathu OTP Change",
                    html: `
  <div style="background-color:#f5f5f7;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="520" style="background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 4px 12px rgba(15,23,42,0.08);">
            <tr>
              <td style="text-align:left;">
                <h2 style="margin:0 0 8px;font-size:22px;color:#111827;">Email Verification</h2>
                <p style="margin:0 0 16px;font-size:14px;color:#4b5563;">
                  Use the One‑Time Password (OTP) below to complete your action on <strong>Anash</strong>.
                </p>
                <p style="margin:0 0 24px;font-size:13px;color:#6b7280;">
                  This code is valid for the next <strong>10 minutes</strong>. Do not share it with anyone.
                </p>

                <div style="text-align:center;margin:0 0 24px;">
                  <div style="display:inline-block;padding:14px 28px;border-radius:999px;background:#111827;color:#f9fafb;font-size:24px;letter-spacing:6px;font-weight:bold;">
                    ${OTP}
                  </div>
                </div>

                <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
                  If you did not request this code, you can safely ignore this email.
                </p>
                <p style="margin:0;font-size:13px;color:#9ca3af;">
                  Thanks,<br/>
                  The anash Team
                </p>
              </td>
            </tr>
          </table>

          <p style="margin-top:16px;font-size:11px;color:#9ca3af;">
            You are receiving this email because an OTP request was made for your account.
          </p>
        </td>
      </tr>
    </table>
  </div>
  `, // HTML body
                });

                console.log("Message sent:", info.messageId);
                return res.render('./pages/otp.ejs');
            } else {
                req.flash("error", "Email Not Found!");
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    otp(req, res) {
        if (req.body.otp == OTP) {
            return res.render('./pages/newPassword.ejs');
        } else {
            return res.render('./pages/newPassword.ejs')
        }
    },
    async newPassword(req, res) {
        try {
            const { newPassword, confirmPassword } = req.body;
            if (newPassword == confirmPassword) {
                let { token } = req.cookies;
                let decode = jwt.verify(token, 'dax');
                let user = await UserModel.findById(decode.id);

                if (user) {
                    user.password = await bcrypt.hash(newPassword, 10);
                    user.save();
                    req.flash("success", "Password Change!");
                    return res.redirect('./pages/login.ejs');
                } else {
                    return res.redirect('./pages/login.ejs');
                }
            } else {
                req.flash("error", "Password Not Match");
            }
        } catch (error) {
            console.log(error.message);
        }
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

            // handle profile image
            if (req.file) {
                req.body.image=req.file.path;
            } else {
                console.log('[editProfile] No profile image file');
            }

            let dbuser= await UserModel.findByIdAndUpdate(oneUser.id, req.body);
            return res.redirect('/profilePage');
        } catch (error) {
            console.error('[editProfile] Error:', error.message);
            return res.redirect(req.get('Referrer') || '/editProfile');
        }
    },
}

export default authCtl