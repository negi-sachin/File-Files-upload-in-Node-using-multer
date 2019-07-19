const path=require('path');
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');

//CREATE EXPRESS APP
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
 
// Configuring Storage
var storage = multer.diskStorage({
  //destination set location of file to be saved
  destination: function (req, file, cb) {
    cb(null, 'upload') //create 'upload' folder in same directory before running code or you can give other folder with full absolute path
  },
  //filename set name of uplaoded files
  filename: function (req, file, cb) {
    cb(null, 'file'+Date.now()+ path.extname(file.originalname)) //eg-file154738282.jpg,file184637377.txt
  }
})
 
var upload = multer({ storage: storage })

 

 
// ROUTES

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html'); //index.html will get open when you run your localhost at port
 
});

//single file
//Note:Html forms data(field names,action) should be matched with some paramters.Take precaution

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file //assigning uploaded file details to file
  if (!file) {  //error handling
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
     console.log('File uploaded successfully'); //when file get uploaded successfully it will be display console
     res.send(file); //Shows details of file in json format .
    //{"fieldname":"myFile","originalname":"1_OcODYT4IhrThbJLwcLOSPg.jpeg","encoding":"7bit","mimetype":"image/jpeg","destination":"upload","filename":"file1563519734660.jpeg","path":"upload\\file1563519734660.jpeg","size":37920}
  
})


//Uploading multiple files
//Comments are almost same as for single file upload 
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => //uplaod.array('fieldname',maximum number of files that can be uploaded)
  {
    const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log('Files uploaded successfully');
    res.send(files)
  
})

//running at port 3000.Yours port may b different so choose accordingly.
app.listen(3000, () => console.log('Server started on port 3000'));

//before running code do install all packages like multer,bodyparser,express.You can do it by 'npm install'in terminal .
//Precations:

//Html file should be name 'index.html'
//create upload folder before running code
//By Sachin Negi