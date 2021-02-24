const express = require('express')
const nodemailer = require('nodemailer');
const app = express()
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const port = 3000

app.get('/', (req, res) => {
  res.render('index.ejs')
})


app.get('/contact', (req, res)=>{
  res.render('contact')
})

app.post("/contact", (req, res)=>{
  const outmail = `
    <p> You have a new contact request </p>
    <h3> Contact Details </h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
     
      
    </ul>
    <h2>Message</h2>
    <p> ${req.body.message}</p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.icube.af",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'moheb@icube.af', // generated ethereal user
        pass: 'leyla932820', // generated ethereal password
      },
    });
    // send mail with defined transport object
  let mailInfo = ({
    from: '"Curcuit City Technology" <moheb@icube.af', // sender address
    to: "toryalaimoheb.ahmad@gmail.com", // list of receivers
    subject: "CCT Contacts", // Subject line
    text: "", // plain text body
    html: outmail, // html body
  });
  transporter.sendMail(mailInfo, (err, info)=>{
    if(err){
      return console.log(err);
    }else{
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.redirect('/contact') 
    }
  });
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})