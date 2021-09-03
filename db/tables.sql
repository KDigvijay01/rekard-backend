CREATE TABLE IF NOT EXISTS users(
    id bigint unsigned AUTO_INCREMENT NOT NULL,
    username varchar(128) NOT NULL,
    password varchar(128) NOT NULL,
    is_active boolean default TRUE,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    created_by varchar(128) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS user_details(
    user_id bigint unsigned AUTO_INCREMENT NOT NULL,
    name varchar(128) NOT NULL,
    father_name varchar(128) DEFAULT NULL,
    address varchar(255) DEFAULT NULL,
    pincode varchar(6) DEFAULT NULL,
    city varchar(128) DEFAULT NULL,
    state varchar(128) DEFAULT NULL,
    phone varchar(10) NOT NULL,
    email varchar(128) NOT NULL,
    notes varchar(255) DEFAULT NULL,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),CONSTRAINT `FK_USER_ID` FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_role(
    user_id bigint unsigned AUTO_INCREMENT NOT NULL,
    role ENUM('supertindent', 'caretaker', 'principal', 'maingate_security') NOT NULL,
    is_active boolean default TRUE,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id), 
    CONSTRAINT `FK_USER_ROLE` FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS students(
    roll_no varchar(30) NOT NULL,
    reg_no varchar(30) DEFAULT NULL,
    batch varchar(20) NOT NULL,
    father_name varchar(128) NOT NULL,
    mother_name varchar(128) NOT NULL,
    address varchar(255) NOT NULL,
    pincode varchar(6) NOT NULL,
    city varchar(30) NOT NULL,
    state varchar(30) NOT NULL,
    blood_group varchar(10) DEFAULT NULL,
    phone_1 varchar(10) NOT NULL,
    phone_2 varchar(10) default NULL,
    fathers_phone varchar(10) NOT NULL,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (roll_no)
);


CREATE TABLE IF NOT EXISTS hostels(
    id bigint unsigned AUTO_INCREMENT NOT NULL,
    name varchar(128) NOT NULL,
    address varchar(255) default NULL,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    is_active boolean default TRUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS staffs(
    hostel_id bigint unsigned NOT NULL,
    user_id bigint unsigned NOT NULL,
    is_active boolean default TRUE,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (hostel_id,user_id),
    CONSTRAINT `FK_CARE_HOSTEL_ID` FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_CARE_USER_ID` FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS allotments(
    roll_no varchar(30) NOT NULL,
    hostel_id bigint unsigned NOT NULL,
    room_no varchar(10) NOT NULL,
    due_date datetime default current_timestamp,
    is_active boolean default TRUE,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (roll_no, hostel_id),
    CONSTRAINT `FK_ALLOT_ROLL_NO` FOREIGN KEY (roll_no) REFERENCES students(roll_no) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_ALLOT_HOSTEL_ID` FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS entry_registers(
    roll_no varchar(30) NOT NULL,
    hostel_id bigint unsigned NOT NULL,
    type ENUM('campus_entry','hostel_entry') NOT NULL,
    in_time datetime default current_timestamp,
    out_time datetime default NULL,
    notes varchar(255) default NULL,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `FK_ENTRY_ROLL_NO` FOREIGN KEY (roll_no) REFERENCES students(roll_no) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_ENTRY_HOSTEL_ID` FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_sessions (
    user_id bigint unsigned NOT NULL,
    login_time timestamp default CURRENT_TIMESTAMP,
    logout_time timestamp default null
);

