# Database

Before running API, you have to:

- install MySQL,
- create database `notes` with UTF8-BIN collation otherwise international characters will not work,
- create user `admin`
- grant `admin` user permissions on `notes` database

Run commands below, while being connected to MySQL:

```
CREATE DATABASE notes CHARACTER SET utf8 COLLATE utf8_bin;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON notes.* TO 'admin'@'localhost';
```

Provide a file for database import with prepared mock data for:

- users
- folders
- notes
