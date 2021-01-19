const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
    res.render('index', {page_name: 'index'});
});

router.get('/about', (req, res)=>{
    res.render('about', {page_name: 'about'});
});

router.get('/legal-documents', (req, res)=>{
    res.render('legal_documents', {page_name: 'legal-documents'});
});

router.get('/job-categories', (req, res)=>{
    res.render('job_categories', {page_name: 'job-categories'});
});

router.get('/clients', (req, res)=>{
    res.render('clients', {page_name: 'clients'});
});

router.get('/contact', (req, res) =>{
    res.render('contact', {page_name: 'contact'});
});

router.get('/application-form', (req, res) =>{
    res.render('application_form', {message: req.flash('message'), page_name: ''});
});

router.post('/application-form', (req, res) => {
    // execute upload middleware
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

            console.log(full_name);
            console.log(passport_number);
            console.log(email);
            console.log(job_category);
            console.log(post);
            console.log(contact_number);
            console.log(address);
            console.log(pp_path);
            console.log(cv_path);

            var transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'kbintlnepal@outlook.com',
                    pass: 'kbIntl001'
                }
            })

            var mailOptions = {
                from: 'kbintlnepal@outlook.com',
                to: 'uidesign76@gmail.com',
                subject: 'Apply For '+ post + ' ('+job_category+')',
                text: '',
                html: html_output,
                attachments:[
                    {
                        path: pp_path
                    },
                    {
                        path: cv_path
                    }
                ]
            }

            transporter.sendMail(mailOptions, function(err, info){
                if (err) {
                    console.log(err);
                }else{
                    console.log('Email Sent' + info.response);
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
                    req.flash('message', 'Mail has been sent successfully.');
                    return res.redirect('/application-form');
                }
            })

        }
    })
});

module.exports = router;