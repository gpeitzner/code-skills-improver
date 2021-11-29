DROP TABLE IF EXISTS _USER_UNIT_TEST;

CREATE TABLE _USER_UNIT_TEST(
    _USER_ID INT NOT NULL,
    UNIT_TEST_ID INT NOT NULL,
    TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (_USER_ID) REFERENCES _USER(_USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (UNIT_TEST_ID) REFERENCES UNIT_TEST(UNIT_TEST_ID) ON DELETE CASCADE
);
