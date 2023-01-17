var db = require('../config/connection')
const { response } = require('../app');
var collection =require('../config/collection')
var objectId = require('mongodb').ObjectId

module.exports={
    addstudent:(student,callback)=>{
        console.log(student);

        db.get().collection(collection.STUDENT_COLLECTION).insertOne(student).then((data)=>{
            console.log(data)
            callback(data.insertedId.toString())
        })
    },
    getAllStudents:()=>{
        return new Promise(async(resolve,reject)=>{
            let students = await db.get().collection(collection.STUDENT_COLLECTION).find().toArray()
            resolve(students)
        })
    },
    deleteStudents:(StudId)=>{
        return new Promise ((resolve,reject)=>{
            console.log(StudId)
            console.log(objectId(StudId))
            db.get().collection(collection.STUDENT_COLLECTION).deleteOne({_id:objectId(StudId)}).then((response)=>{
                console.log(response)
                resolve(response)

            })

        })
    },
    getStudentDetails:(StudId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.STUDENT_COLLECTION).findOne({_id:objectId(StudId)}).then((student)=>{
                resolve(student)

            })
        })
    },

    updateStudent:(StudId,studDetails)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.STUDENT_COLLECTION).updateOne({_id:objectId(StudId)},{
                $set:{
                    Name:studDetails.Name,
                    Division:studDetails.Division,
                    Class:studDetails.Class,
                    Age:studDetails.Age

                }
            }).then((response)=>{
                resolve()
            })
        })

    },

}