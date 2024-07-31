CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR (50) NOT NULL,
        כשרות VARCHAR (50) NOT NULL,
        ספק VARCHAR (50) NOT NULL,
        יצרן VARCHAR (50) NOT NULL,
        כמות INTEGER DEFAULT 0,
        יחידה VARCHAR (50) NOT NULL,
        כמות_מינימלית INTEGER DEFAULT 0
        );

INSERT INTO stock(שם, קטגוריה, כשרות, ספק, יצרן, כמות, יחידה, כמות_מינימלית)
VALUES ('עוף', 'אוכל', 'בשרי', 'עוף ירושלים', 'תנובה', 32, 'ק"ג', 17) ;

DROP TABLE stock ;

CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        טל VARCHAR (50) NOT NULL,
        מייל VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR(50) NOT NULL,
        מוצר VARCHAR (50) NOT NULL,
        מחיר_ליחידה INTEGER NOT NULL,
        יחידה VARCHAR (50) NOT NULL,
        זמן_אספקה_בימים INTEGER NOT NULL
        );

INSERT INTO suppliers(שם, טל, מייל, קטגוריה, מוצר, מחיר_ליחידה, יחידה, זמן_אספקה_בימים)
VALUES ('שוקו-שוקו', '0587918017', 'choco-choco@gmail.com', 'אוכל', 'שוקולד', 40, 'ק"ג', 3) ;

CREATE TABLE IF NOT EXISTS menus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR (50) NOT NULL,
        כשרות VARCHAR (50),
        עלות INTEGER
        );

INSERT INTO menus(שם, קטגוריה, כשרות)
VALUES ('ארוחת בוקר 1', 'ארוחת בוקר', 'חלבי');

CREATE TABLE IF NOT EXISTS menuCategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR (50)
        );

INSERT INTO menuCategories(שם)
VALUES ('בין המצרים'), ('סעודת חנוכה'), ('עונג שבת'),('סעודה שלישית לשבת'), ('סעודה שניה לשבת'),('סעודה ראשונה לשבת'), ('ארוחת ערב'), ('ארוחת צהריים'), ('ארוחת בוקר');     

UPDATE menuCategories SET 'קטגוריה' = 'קטגוריות תפריטים'

CREATE TABLE IF NOT EXISTS menuDishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idMenu VARCHAR (50), 
        idDish VARCHAR (50) 
        );

CREATE TABLE IF NOT EXISTS stockCategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR (50)
        );

INSERT INTO stockCategories(שם)
VALUES ('אוכל'), ('שתיה'), ('סכו"ם');  

UPDATE stockCategories SET 'קטגוריה' = 'קטגוריות מוצרים';

drop table dishCategories;

CREATE TABLE IF NOT EXISTS dishCategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR (50)
        );

INSERT INTO dishCategories(שם)
VALUES ('מנה ראשונה'), ('מנה עיקרית'), ('מנה אחרונה'); 

UPDATE dishCategories SET 'קטגוריה' = 'קטגוריות מנות';

CREATE TABLE IF NOT EXISTS dishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50) NOT NULL,
        קטגוריה VARCHAR (50) NOT NULL,
        כשרות VARCHAR (50),
        עלות INTEGER
        );

INSERT INTO dishes(שם, קטגוריה, כשרות)
VALUES ('שניצל', 'מנה עיקרית', 'בשרי');

CREATE TABLE IF NOT EXISTS dishIngredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idDish INTEGER,
        idIngredient INTEGER,
        כמות INTEGER,
        יחידה VARCHAR (25)
        );

CREATE TABLE IF NOT EXISTS menusCalendar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day VARCHAR (25),
        month VARCHAR (25),
        year VARCHAR (25),
        idMenu INTEGER,
        amount INTEGER,
        used boolean DEFAULT false
        );


-- CREATE TABLE IF NOT EXISTS menusForDay (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         idDate INTEGER,
--         idMenu INTEGER
--         );

UPDATE menusCalendar SET 'amount' = 10;

CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        שם VARCHAR (50),
        מייל VARCHAR (50),
        סיסמה VARCHAR (50),
        הרשאה VARCHAR (50)
        );

INSERT INTO users(שם, מייל, סיסמה, הרשאה)
VALUES ('דוד', 'david@gmail.com', '1234', 'מנהל');

CREATE TABLE IF NOT EXISTS suppliersOrdersCalendar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day VARCHAR (25),
        month VARCHAR (25),
        year VARCHAR (25),
        idProduct INTEGER,
        amount INTEGER,
        unity VARCHAR (25),
        supplier VARCHAR (75),
        placed boolean DEFAULT false,
        readed boolean DEFAULT false,
        toSend boolean DEFAULT false,
        garbage boolean DEFAULT false
        );


CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        כותרת VARCHAR,
        תוכן TEXT
        );

CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idUser INTEGER,
        daysToSendMessage INTEGER DEFAULT 1
        );

DELETE FROM menuDishes

