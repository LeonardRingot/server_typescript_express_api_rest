# script de création de l'admin de la base de données 
CREATE ROLE apiauth_admin
WITH
    LOGIN NOSUPERUSER CREATEDB NOCREATEROLE INHERIT NOREPLICATION CONNECTION
LIMIT -1 PASSWORD 'xxxxxx';