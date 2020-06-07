let Busboy = require('busboy')
let s3upload = require('../libs/s3Upload')
let mongoose = require('mongoose')
const UserModel = mongoose.model('User')

let uploadImage = (req, res) => {
    try {
        let busboy = new Busboy({ headers: req.headers })
        busboy.on('finish', async function () {
            if (Object.keys(req.files).length === 0) {
                res.status(400).send({ statusCode: 400, })
            } else {
                let fileName = 'userImages/' + req.params.userId + '/' + Date.now();
                const file = req.files.myfile;
                fileName += '.' + file.name.substr(file.name.lastIndexOf('.') + 1);
                const data = await s3upload.uploadToS3(file, fileName);   //s3 upload
                console.log(data);
                let result;
                const path = 'https://linkedup.s3.ap-south-1.amazonaws.com/' + fileName;

                result = {
                    "path": path,
                }

                let createUser = {
                    profilePicUrl: path,
                }

                let createdUser = await UserModel.updateOne({userId: userId}, createUser);
                res.status(200).send({ statusCode: 200, body: result })
            }
        });
        req.pipe(busboy);
    } catch (err) {
        console.log(err)
        res.status(500).send({ statusCode: 500, })
    }
}
module.exports = {
    uploadImage,
}
