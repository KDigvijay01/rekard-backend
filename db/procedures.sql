DELIMITER //

DROP PROCEDURE IF EXISTS `create_user`//
CREATE PROCEDURE `create_user`(
    IN username varchar(128),
    IN password varchar(128),
    IN role varchar(64),
    IN name varchar(128),
    IN fathersName varchar(128),
    IN address varchar(255),
    IN pincode varchar(6),
    IN city varchar(128),
    IN state varchar(128),
    IN phone varchar(10),
    IN email varchar(128),
    IN notes varchar(255),
    IN hostelId int,
    OUT resultId int
) users_entry_proc: BEGIN

    DECLARE userId BIGINT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
    SET resultId = -1;
    ROLLBACK;
    END;

    START TRANSACTION;
        select id into userId from users u where u.username = username;
        select userId;
        IF (userId is not null ) THEN
            ROLLBACK;
            SET resultId = -2;
            leave users_entry_proc;
        END IF;
 
        insert into users (username, password)  values (username, password);
        set userId = LAST_INSERT_ID();
        insert into user_role(user_id, role)  values (userId, role);
        insert into user_details(user_id, name, father_name, address, pincode, city, state, phone, email, notes)
                        values(userId, name, fathersName, address, pincode, city, state, phone, email, notes);

        IF (role <> 'principal') THEN 
            insert into staffs (user_id, hostel_id)  values (userId, hostelId);
        END IF;

        SET resultId = 1;

    COMMIT;
END//


DELIMITER ;