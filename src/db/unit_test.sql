DROP TABLE IF EXISTS UNIT_TEST;

CREATE TABLE UNIT_TEST(
    UNIT_TEST_ID SERIAL,
    PROBLEM_ID INT NOT NULL,
    CODE TEXT NOT NULL,
    INPUT TEXT NOT NULL,
    OUTPUT TEXT NOT NULL,
    STATUS BOOLEAN DEFAULT true,
    PRIMARY KEY (UNIT_TEST_ID),
    FOREIGN KEY (PROBLEM_ID) REFERENCES PROBLEM(PROBLEM_ID)
);
