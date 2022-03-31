const database = require('../../../Data/dataSource/databaseConnect')
const queries = require('../../../Data/dataSource/queries')
const user = require('../../Model/User')

async function authentication(req, res) {
    //check voi user thay vi infor de dam bao tinh flexible
    infor = req.body

    query = queries.authentication(infor.username, infor.password)
    // query = queries.authentication()
    results = await database.makeQuery(query);


    res.status(200).send(true)
    // res.status(200).send(results)
};

module.exports = {
    authentication
}