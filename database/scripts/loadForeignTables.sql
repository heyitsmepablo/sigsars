CREATE EXTENSION IF NOT EXISTS file_fdw;

CREATE SERVER IF NOT EXISTS file_server
FOREIGN DATA WRAPPER file_fdw;

CREATE FOREIGN TABLE tipos_unidades_csv (
    nome TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/tipos-unidades.csv',
    format 'csv',
    header 'true',
    delimiter ','
);

INSERT INTO tipo_unidade (nome)
SELECT * FROM tipos_unidades_csv;

CREATE FOREIGN TABLE unidades_csv (
  "nome" TEXT NOT NULL,
  "sigla" TEXT,
  "endereco" TEXT,
  "cnes" TEXT,
  "cnpj" TEXT,
  "email_principal" TEXT,
  "email_alternativo" TEXT,
  "numero_leitos_uti" INT,
  "numero_leitos_uci" INT,
  "numero_leitos_enfermaria" INT,
  "numero_leitos_suporte_ventilatorio_pulmonar" INT,
  "numero_leitos_cnes_total" INT,
  "tipo_unidade_id" INT,
  "setor" TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/unidades.csv',
    format 'csv',
    header 'true',
    delimiter ','
);

INSERT INTO unidade (nome,sigla,endereco,cnes,cnpj,email_principal,email_alternativo,numero_leitos_uti,numero_leitos_uci,numero_leitos_enfermaria,numero_leitos_suporte_ventilatorio_pulmonar,numero_leitos_cnes_total,tipo_unidade_id,setor)
SELECT * FROM unidades_csv;

CREATE FOREIGN TABLE cids_csv (
 "codigo" TEXT,
 "patologia" TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/cids/subcategorias.csv',
    format 'csv',
    header 'true',
    delimiter ';'
);

INSERT INTO cid (codigo,patologia) 
SELECT * FROM cids_csv;