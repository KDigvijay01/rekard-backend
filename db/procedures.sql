DELIMITER //

DROP PROCEDURE IF EXISTS `student_entry`//
CREATE PROCEDURE `student_entry`(
    IN rollNo varchar(30),
    IN regNo varchar(30),
    IN name varchar(128),
    IN batch varchar(20),
    IN fatherName varchar(128),
    IN motherName varchar(128) ,
    IN address varchar(255),
    IN pincode varchar(20),
    IN city varchar(30),
    IN state varchar(30),
    IN bloodGroup varchar(10),
    IN phone1 varchar(30),
    IN phone2 varchar(30),
    IN fathersPhone varchar(30)
    OUT resultId int
) students_entry_proc: BEGIN

    DECLARE EXIST HANDLER FOR SQLEXCEPTION BEGIN
        set resultId = - 1;
        ROLLBACK;
    END;

    START TRANSACTION;


    COMMIT;
END//
