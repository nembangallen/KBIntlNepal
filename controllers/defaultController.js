module.exports = {
    index: (req, res) => {
        res.render('pages/index', {page_name: 'index'});
    },
    about: (req, res)=>{
        res.render('pages/about', {page_name: 'about'});
    },
    legal_documents: (req, res)=>{
        res.render('pages/legal_documents', {page_name: 'legal-documents'});
    },
    job_categories: (req, res)=>{
        res.render('pages/job_categories', {page_name: 'job-categories'});
    },
    clients: (req, res)=>{
        res.render('pages/clients', {page_name: 'clients'});
    },
    contact: (req, res) =>{
        res.render('pages/contact', {page_name: 'contact'});
    },
    application_form: (req, res) =>{
        res.render('pages/application_form', {message: req.flash('message'), page_name: ''});
    }

}