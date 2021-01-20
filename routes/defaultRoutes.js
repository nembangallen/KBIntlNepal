const express = require('express');
require('dotenv').config();
const router = express.Router();
const defaultController = require('../controllers/defaultController');

const nodemailer = require('nodemailer');
const multer = require('multer');

const fs = require('fs');

var full_name;
var passport_number;
var email;
var job_category;
var post;
var contact_number;
var address;
var pp_path;
var cv_path;


var Storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, './uploads')
    },
    filename:function(req, file, callback){
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

var upload = multer({
    storage: Storage
}).fields([{ name: 'pp', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);

router.route('/')
    .get(defaultController.index);

router.route('/about')
    .get(defaultController.about);

router.route('/legal-documents')
    .get(defaultController.legal_documents);

router.route('/job-categories')
    .get(defaultController.job_categories);

router.route('/clients')
    .get(defaultController.clients);

router.route('/contact')
    .get(defaultController.contact);

router.route('/application-form')
    .get(defaultController.application_form);


router.post('/application-form', (req, res) => {

    upload(req, res, function(err){
        if (err){
            console.log(err);
            return res.end("Something went wrong");
        } else{
            full_name = req.body.full_name;
            passport_number = req.body.passport_number;
            email = req.body.email;
            job_category = req.body.job_category;
            post = req.body.post;
            contact_number = req.body.contact_number;
            address = req.body.address;
            
            pp_path = req.files.pp[0].path
            cv_path = req.files.cv[0].path
    
            const html_output = `
                <h3 align="center";>You have a new applicant.</h3>
                <p>Details: </p>
                <ul>
                    <li>Full Name: ${full_name}</li>
                    <li>Passport number: ${passport_number}</li>
                    <li>Email: ${email}</li>
                    <li>Job Category: ${job_category}</li>
                    <li>Post: ${post}</li>
                    <li>Contact number: ${contact_number}</li>
                    <li>Address: ${address}</li>
                </ul>
            `;
    
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const pp = fs.readFileSync(pp_path).toString('base64');
            const cv = fs.readFileSync(cv_path).toString('base64');
            const msg = {
                to: 'uidesign76@gmail.com', // Change to your recipient
                from: 'no.replytokb@gmail.com', // Change to your verified sender
                subject: `Application for ${post} (${job_category})`,
                html: html_output,
                attachments: [
                    {
                        content: pp,
                        filename: "pp.pdf",
                        type: "application/pdf",
                        disposition: "attachment"
                    },
                    {
                        content: cv,
                        filename: "cv.pdf",
                        type: "application/pdf",
                        disposition: "attachment"
                    }
                ],
                html: html_output,
            }
            sgMail
            .send(msg)
            .then(() => {
                fs.unlink(pp_path, function(err){
                    if (err){
                        return res.end(err)
                    }else{
                        console.log("Deleted");
                    }
                })

                fs.unlink(cv_path, function(err){
                    if (err){
                        return res.end(err)
                    }else{
                        console.log("Deleted");
                    }
                })
                console.log('Email sent')
                req.flash('message', 'Mail has been sent successfully.');
                return res.redirect('/application-form');
            })
            .catch((error) => {
                console.error(error)
            })
    
        }
    })


});

module.exports = router;