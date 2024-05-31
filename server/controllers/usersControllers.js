const { json } = require("express");
const User = require("../model/userModel")
const brcypt = require("bcrypt")




module.exports.register = async(req,res,next) => {
    console.log(req.body);
    try {
        const {username,password,email} = req.body
    const usernameCheck = await User.findOne({username});
    if (usernameCheck) {
        return res.json({msg:"Username already used",status: false})
    }
    const emailCheck = await User.findOne({email})
    if (emailCheck) {
        return res.json({msg:"Email already used",status:false})
    }
    const hashedPassword = await brcypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
    })

    delete user.password
    return res.json({status:true,user})
    }
    catch(e) {
        console.log(e);
        next(e);
    }
};


module.exports.login = async(req,res,next) => {
    
    try {
        const {username,password} = req.body
    const usernameCheck = await User.findOne({username})
    if (!usernameCheck) {
        return res.json({ msg: "User not found", status: false,statusCode: 401 });
    }

    const passwordUnhashed = await brcypt.compare(password, usernameCheck.password);

    if (!passwordUnhashed) {
        console.log(passwordUnhashed, "failed");
        return res.json({ msg: "Password must match", status: false,statusCode:401 });
    }
    delete usernameCheck.password;
    console.log("Credential entered is correct")
    return res.json({ user : usernameCheck, status: true });

    } catch (e) {
        console.log(e)
        next(e)
    }
}


module.exports.setAvatar = async(req,res,next) => {

    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage,
        });
        return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
        });

    }catch(error) {
        console.log(error)
        next(error)
    }
}



module.exports.getallusers = async(req,res,next) => {
    try {
        const all_users_except_self = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
            ]);
            return res.json(all_users_except_self)
    } catch (error) {
        console.log(error)
        next(error)
    }
}