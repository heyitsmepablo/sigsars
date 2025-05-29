CREATE EXTENSION IF NOT EXISTS file_fdw;

CREATE SERVER IF NOT EXISTS file_server
FOREIGN DATA WRAPPER file_fdw;

CREATE FOREIGN TABLE tipo_unidades_csv (
    nome TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/tipos-unidades.csv',
    format 'csv',
    header 'true',
    delimiter ','
);
