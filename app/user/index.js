const globalHelper = require('../utils/helper');


async function test(){
    let statement = `select * from test where id  = ?;`
    let values = [1];
    const resp = await globalHelper.sqlExecutorAsync(statement, values);
    return resp
}


module.exports ={
    test
}