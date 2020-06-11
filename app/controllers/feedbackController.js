let mongoose = require('mongoose')

let util = require('../libs/util')
/**Models */
const FeedbackModel = mongoose.model('Feedback')

let insertFeedback = async (req, res) => {
    try {
        let feedbackTitle = req.body.feedbackTitle;
        let feedbackDescription = req.body.feedbackDescription;
        let userId = req.body.userId;
        let brand = req.body.brand;
        let device = req.body.device;
        let manufacturer = req.body.manufacturer;
        let model = req.body.model;
        let product = req.body.product;
        let versionBaseOs = req.body.versionBaseOs;
        let versionCodename = req.body.versionCodename;
        let versionIncremental = req.body.versionIncremental;
        let versionPreviewSdk = req.body.versionPreviewSdk;
        let versionRelase = req.body.versionRelase;
        let versionSdk = req.body.versionSdk;
        let versionSecurityPatch = req.body.versionSecurityPatch;

                let createFeedback = new FeedbackModel({
                    feedbackTitle: feedbackTitle,
                    feedbackDescription: feedbackDescription,
                    userId: userId,
                    brand: brand,
                    device: device,
                    manufacturer: manufacturer,
                    model: model,
                    product: product,
                    versionBaseOs: versionBaseOs,
                    versionCodename: versionCodename,
                    versionIncremental: versionIncremental,
                    versionPreviewSdk: versionPreviewSdk,
                    versionRelase: versionRelase,
                    versionSdk: versionSdk,
                    versionSecurityPatch: versionSecurityPatch,
                });
                
                let createdUser = await createFeedback.save();
            
        res.status(200).send({ statusCode: 200, data: createFeedback})
    
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}


module.exports = {
    insertFeedback,
}