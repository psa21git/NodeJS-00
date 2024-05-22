const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url')

const { randomUUID } = new ShortUniqueId({ length: 10 });

async function handleGenerateNewShortUrl(req,res){
    const body = req.body
    if(!body.url) return res.status(400).send({error:'Url is Required !'})
    const shortID = randomUUID()
    await URL.create({
        shortId: shortID,
        redirectUrl:body.url,
        visitHistory:[]
    })

    return res.render("home",{
        id: shortID
    })
} 
async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}