const globalHelper = require('../utils/helper');
const jwt=require('jsonwebtoken');
const secret_key="thisisasecretkeyforrekardbackendappbuiltbymanishkumaralsoknownasbhaiyaji";



async function test(){
    let statement = `select * from test where id  = ?;`
    let values = [1];
    const resp = await globalHelper.sqlExecutorAsync(statement, values);
    return resp
}

let login=async function staffLogin(params){
    const {username, password} = params;
    if (!username || !password) {return {status:'error', message: 'please pass credentials'}}
    else{
        let statement = `
        select u.id as user_id, u.username, ud.name, ur.role, ud.father_name, ud.address,ud.pincode, ud.city, ud.state, ud.phone, ud.email, ud.notes, h.id as hostel_id,h.name as hostel_name, h.address as hostel_address from users u left join user_details ud on u.id=ud.user_id left join staffs s on u.id=s.user_id left join user_role ur on u.id=ur.user_id left join hostels h on s.hostel_id = h.id WHERE u.username=? and u.password=? and u.is_active=1`;
        const values=[username,password];
        const resp = await globalHelper.sqlExecutorAsync(statement, values);
        if (resp.data.length === 0){
            return {status:'error', message: "user doesn't exist"}
        }else{
            const token=jwt.sign({username, password},secret_key)
            const data=resp.data.shift();
            data.token=token;
            resp.data=data;
            return resp
        }
    }
}


module.exports ={test,login}