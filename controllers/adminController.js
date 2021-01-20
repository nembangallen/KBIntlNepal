 module.exports = {
     index: (req, res) => {
         res.render('admin/index', { layout: './layouts/admin_layout.ejs' });
     },
     register: (req, res) => {
         res.render('admin/register', {layout: './layouts/admin_layout.ejs'});
     }
 }