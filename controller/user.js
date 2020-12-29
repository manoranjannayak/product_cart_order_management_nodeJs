const userModel = require("../model/user");

exports.create = async (req, res) => {
  var user = [
    {
      name: "manoranjan"
    },
    { name: "mannu" }
  ];

  userModel.insertMany(user).then((err,data)=>{
      if(err){
          res.send(err)
      }else{
          res.send(data)
      }
  })
};
