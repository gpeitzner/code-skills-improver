DROP TABLE IF EXISTS PROBLEM;

CREATE TABLE PROBLEM(
    PROBLEM_ID SERIAL,
    TITLE TEXT NOT NULL,
    DESCRIPTION TEXT NOT NULL,
    BASE_CODE TEXT NOT NULL,
    STATUS BOOLEAN DEFAULT true,
    PRIMARY KEY (PROBLEM_ID)
);
