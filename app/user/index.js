const globalHelper = require('../utils/helper');


async function test(){
    let statement = `select * from test where id  = ?;`
    let values = [1];
    const resp = await globalHelper.sqlExecutorAsync(statement, values);
    return resp
}

async function staffLogin(params){
    const {username, password} = params;
    if (!username || !password) return {status:'error', message: 'please pass credentials'};
    let statement = `select * `
}


module.exports ={
    test
}