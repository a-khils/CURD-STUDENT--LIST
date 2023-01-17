const mongoClient = require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect = function(done){
    const url = MONGODB_URL || 'mongodb://127.0.0.1'
    const dbname = 'CURD'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbname)
        console.log(state.db)

        done()

    })

}
module.exports.get=function(){
    return state.db
}
