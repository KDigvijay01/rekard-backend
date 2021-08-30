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



module.exports = {
    addStudent
}