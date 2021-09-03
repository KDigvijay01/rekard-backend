const globalHelper = require('../utils/helper');

async function checkForIn(data) {
    let statement=`SELECT * FROM entry_registers WHERE roll_no=? and type=? and hostel_id=? and out_time IS NULL ORDER BY in_time desc  LIMIT 1`
    let values=[data.roll_no, data.type, data.hostel_id];
    let resp=await globalHelper.sqlExecutorAsync(statement, values);
    return resp
}

async function checkForOut(data) {
    let statement=`SELECT * FROM entry_registers WHERE roll_no=? and type=? and hostel_id=? and out_time IS NULL ORDER BY in_time desc  LIMIT 1`
    let values=[data.roll_no, data.type, data.hostel_id];
    let resp=await globalHelper.sqlExecutorAsync(statement, values);
    return resp
}

async function entry_in(data){
    let statement = `INSERT INTO  entry_registers(roll_no,hostel_id,type,notes) VALUES(?,?,?,?)`
    let values = [data.roll_no, data.hostel_id, data.type, data.notes];
    let resp=await globalHelper.sqlExecutorAsync(statement, values)

    if (resp.status === 'error') {
        return {status: 'error', message: 'this is test message'};
    }
    return resp
}
async function entry_out(date,data){
    let statement = `UPDATE entry_registers SET out_time=? WHERE roll_no=? and out_time IS NULL and type=? ORDER BY in_time desc LIMIT 1`
    let values = [date, data.roll_no, data.type];
    let resp=await globalHelper.sqlExecutorAsync(statement, values);
    return resp
}
async function info(roll_no,l1,l2){
    if (l1===undefined && l2===undefined && roll_no===undefined){ 
    let statement= `select * from entry_registers`;
    let resp=await globalHelper.sqlExecutorAsync(statement)
    return resp
    }
    else if(roll_no!==undefined && l1 !==undefined & l2 !==undefined){
        let statement= `select * from entry_registers WHERE roll_no=? LIMIT ${l1},${l2}`;
        let values = [roll_no];
        let resp=await globalHelper.sqlExecutorAsync(statement,values);
        return resp
    }
    else if(roll_no!==undefined && l1 !==undefined && l2 ===undefined){
        let statement= `select * from entry_registers WHERE roll_no=? LIMIT ${l1}`;
        let values = [roll_no];
        let resp=await globalHelper.sqlExecutorAsync(statement,values);
        return resp
    }
    else{
        let statement= `select * from entry_registers WHERE roll_no=?`;
        let resp=await globalHelper.sqlExecutorAsync(statement,roll_no);
        return resp
    }
}

module.exports ={
    entry_in,entry_out,checkForIn,checkForOut,info
}
