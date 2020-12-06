Important Information:

//Send Email Templates
1 - Create a views folder
2 - Create an index.handlebars file in views
3 - Populate the file with html
4 - run: npm install nodemailer-express-handlebars -S //-S saves this as a dependency
5 - Require the package using: const hbs = require('nodemailer-express-handlebars');
6 - Make sure the package is configured with your transporter object.
        -hint, transporter.use('compile', hbs({
                viewEngine: the engine this is running on, express-handlebars
                viewPath: in our case, the views folder. './views/'
        }))
7 - The package is now configured with your transporter
8 - To use a template, add an extra key to your email message called "template"
9 - Specify which template you want to use.
        template : (name of template)
        Ex. template: "index"