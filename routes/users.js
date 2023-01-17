var express = require('express');
var router = express.Router();
var helper = require('../helpers/student-helper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  helper.getAllStudents().then((students)=>{
    res.render('view-students',{students})
  })
});

 // add student

router.get("/add-students", function (req, res) {
  res.render("add-students");
});

router.post("/add-students", function (req, res) {

  helper.addstudent(req.body, (id) => {
    let image = req.files.Image;

    image.mv("./public/images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.redirect('/');
      } else {
        console.log(err);
      }
    });
  });
});

router.get('/delete-student/:id',(req,res)=>{
  let studId = req.params.id
  //console.log(proId)
  helper.deleteStudents(studId).then((response)=>{
    res.redirect('/')
  })

})
router.get('/edit-student/:id',async(req,res)=>{
  let student = await helper.getStudentDetails(req.params.id)
  console.log(student)
  res.render('edit-student',{student})
})

router.post('/edit-student/:id',(req,res)=>{
  let id = req.params.id
  helper.updateStudent(req.params.id,req.body).then(()=>{
    res.redirect('/')
   if(req.files.Image){
    let image =req.files.Image;

    image.mv("./public/images/" + id + ".jpg")
    // console.log(req.params.id)
    // console.log(req.files.Image)
  }

  })
  
})


module.exports = router;
