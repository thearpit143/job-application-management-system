CREATE DATABASE IF NOT EXISTS hiring_portal;
USE hiring_portal;

CREATE TABLE IF NOT EXISTS hr_users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_hr_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS candidates (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  linkedin VARCHAR(255),
  portfolio VARCHAR(255),
  github VARCHAR(255),
  college VARCHAR(255),
  graduation_year VARCHAR(20),
  city VARCHAR(100),
  job VARCHAR(150),
  skills TEXT,
  experience TEXT,
  certifications TEXT,
  pitch TEXT,
  resume LONGBLOB,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending',
  apply_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_candidates_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS approved_candidates (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  linkedin VARCHAR(255),
  portfolio VARCHAR(255),
  github VARCHAR(255),
  college VARCHAR(255),
  graduation_year VARCHAR(20),
  city VARCHAR(100),
  job VARCHAR(150),
  skills TEXT,
  experience TEXT,
  certifications TEXT,
  pitch TEXT,
  resume LONGBLOB,
  apply_date DATETIME NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Approved',
  PRIMARY KEY (id),
  UNIQUE KEY uq_approved_candidates_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rejected_candidates (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  linkedin VARCHAR(255),
  portfolio VARCHAR(255),
  github VARCHAR(255),
  college VARCHAR(255),
  graduation_year VARCHAR(20),
  city VARCHAR(100),
  job VARCHAR(150),
  skills TEXT,
  experience TEXT,
  certifications TEXT,
  pitch TEXT,
  resume LONGBLOB,
  apply_date DATETIME NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Rejected',
  PRIMARY KEY (id),
  UNIQUE KEY uq_rejected_candidates_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
