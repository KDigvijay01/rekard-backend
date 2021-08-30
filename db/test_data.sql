-- insert sample students
insert ignore into students (roll_no, reg_no, batch, father_name, mother_name, address, pincode, city, state, blood_group, phone_1, phone_2, fathers_phone )
    values ('17CS35', '17105126036', '2017-21', ' ', ' ', ' BCe college', '800024', 'Patna', 'Bihar', 'O+', '9955775882', null, '3243243432'),
           ('17CS37', '17105126045', '2017-21', ' ', ' ', ' Patna Road', '800024', 'Patna', 'Bihar', 'O+', '89232323525', null, '234863232234'),
           ('17CS11', '17105126035', '2017-21', 'Ranjan Singh', ' ', ' Muzaffarpur road', '800024', 'Muzaffarpour', 'Bihar', 'O+', '9939639598', null, '3243243432') ;



-- insert sample hsotel
insert ignore into hostels(name, address) values ('Boys Hostel 1', 'BCE Campus');

-- allot room to sample students
insert ignore into allotments (roll_no, hostel_id, room_no)
            values ('17CS35', 1, 212), ('17CS37', 1, 132);

-- create sample users
call create_user('principal', 'password@principal', 'principal', 'K. Surendra', null, 'Officer quarters', '560102', 'Patna', 'Bihar', '9999999999', 'pirncipal@bcebakhtyarpur.org', null,1, @resultId); select @resultId as resultId;
call create_user('sonu_caretaker', 'password@sonu', 'caretaker', 'sonu Kumar', null, 'Champapur', '560102', 'Patna', 'Bihar', '9999999999', 'sonu_bkp@gmail.com', null,1, @resultId); select @resultId resultId;
