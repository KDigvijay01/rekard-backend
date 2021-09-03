const globalHelper = require('../utils/helper');


async function addStudent(params) {
    const { 
        rollNo,
        regNo,
        batch,
        fathersName,
        mothersName,
        address,
        pincode,
        city,
        state,
        bloodGroup,
        phone1,
        phone2,
        fathersPhone  
    } = params;

    let statement = `insert into students (roll_no, reg_no, batch, father_name, mother_name, address, pincode, city, state, blood_group, phone_1, phone_2, fathers_phone )
    values (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    let values = [rollNo, regNo, batch, fathersName, mothersName, address, pincode, city, state, bloodGroup, phone1, phone2, fathersPhone];

    const resp = await addStudent(statement, values);
    return resp
    
}

async function studentInfo(params) {
    const {roll_no}=params;
    let statement=`
    select s.roll_no,s.name, s.reg_no, s.batch, a.hostel_id, h.name as hostel_name, a.room_no, a.due_date from allotments a left join students s on a.roll_no=s.roll_no left join hostels h on a.hostel_id = h.id WHERE s.roll_no=? and a.is_active=1`
    let values =[roll_no]
    const resp= await globalHelper.sqlExecutorAsync(statement, values);
    if(resp.data.length===0){
        return{status:"error",msg:"Either this student has no allotments to hostel or is no longer active to hostel"}
    }
    const data= resp.data.shift();
    resp.data=data;
    return resp
}



module.exports = {
    addStudent,studentInfo
}