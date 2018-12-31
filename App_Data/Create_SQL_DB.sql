USE [MASTER]
GO

CREATE DATABASE [Contacts]
GO

IF DB_ID('Contacts') IS NOT NULL
	 USE Contacts

	CREATE TABLE states
	(
		state_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
		state_code CHAR(2) NOT NULL
	)

	GO

	CREATE TABLE person
	(
	 person_id INT identity(1,1) NOT NULL PRIMARY KEY, 
	 first_name VARCHAR(50) NOT NULL,
	 last_name VARCHAR(50) NOT NULL, 
	 state_id int FOREIGN KEY REFERENCES states(state_id),
	 gender CHAR(1) NULL,
	 dob DATETIME NULL
	)

	GO

	CREATE PROC uspStatesList
	AS
	BEGIN
		SELECT * FROM states
	END
	GO

	CREATE PROC uspPersonSearch
	 @SearchValue VARCHAR(50)  = NULL
	AS
	BEGIN
	IF @SearchValue IS NULL
		SELECT * FROM person
	ELSE
		SELECT * FROM person where first_name like '%' + @SearchValue + '%' OR last_name like '%' + @SearchValue + '%'
	END
	GO
	
	CREATE PROC uspPersonUpsert
	@id int,
	@first_name VARCHAR(50),
	@last_name VARCHAR(50),
	@state_id int,
	@gender CHAR(1),
	@dob DATETIME
	AS
	BEGIN
		IF @id = 0
			BEGIN
				INSERT INTO person (first_name, last_name, state_id, gender, dob)
					VALUES
				(@first_name, @last_name, @state_id, @gender, @dob)
			END
		ELSE
			BEGIN
				UPDATE person SET 
					first_name = @first_name,
					last_name = @last_name,
					state_id = @state_id,
					gender = @dob,
					dob = @gender
				WHERE person_id = @id
			END
		END

	GO


	Begin

	INSERT INTO states (state_code) VALUES 
	('AK'),
	('AL'),
	('AR'),
	('AZ'),
	('CA'),
	('CO'),
	('CT'),
	('DE'),
	('FL'),
	('GA'),
	('HI'),
	('IA'),
	('ID'),
	('IL'),
	('IN'),
	('KS'),
	('KY'),
	('LA'),
	('MA'),
	('MD'),
	('ME'),
	('MI'),
	('MN'),
	('MO'),
	('MS'),
	('MT'),
	('NC'),
	('ND'),
	('NE'),
	('NH'),
	('NJ'),
	('NM'),
	('NV'),
	('NY'),
	('OH'),
	('OK'),
	('OR'),
	('PA'),
	('RI'),
	('SC'),
	('SD'),
	('TN'),
	('TX'),
	('UT'),
	('VA'),
	('VT'),
	('WA'),
	('WI'),
	('WV'),
	('WY');
	End

	GO

BEGIN
				INSERT INTO person (first_name, last_name, state_id, gender, dob)
					VALUES
				('Jason', 'Fox',2, 'M', '2018-01-10 00:00:00.000'),
				('Bill', 'Fox',7, 'M', '2013-05-19 00:00:00.000'),
				('Dave', 'Smith',31, 'M', '2018-05-10 00:00:00.000'),
				('Julie', 'Jones',3, 'F', '2001-05-11 00:00:00.000'),
				('Lily', 'Fuller',40, 'F', '1978-05-12 00:00:00.000'),
				('Dawn', 'Black',20, 'F', '2001-05-10 00:00:00.000'),
				('Gary', 'Smith',9, 'M', '2018-05-10 00:00:00.000')
END
GO


