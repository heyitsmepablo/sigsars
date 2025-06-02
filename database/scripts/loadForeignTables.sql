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

CREATE FOREIGN TABLE cid_grupos_csv (
 "id" INT,
 "codigo_categoria_inicio" TEXT,
 "codigo_categoria_fim" TEXT,
 "descricao" TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/cids/grupos_rel.csv',
    format 'csv',
    header 'true',
    delimiter ','
);

INSERT INTO cid_grupo (id,codigo_categoria_inicio,codigo_categoria_fim,descricao)
SELECT * FROM cid_grupos_csv;

CREATE FOREIGN TABLE cid_categorias_csv (
 "id" INT,
 "grupo_id" INT,
 "codigo" TEXT,
 "descricao" TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/cids/categorias_rel.csv',
    format 'csv',
    header 'true',
    delimiter ','
);

INSERT INTO cid_categoria  (id,cid_grupo_id,codigo,descricao)
SELECT * FROM cid_categorias_csv;

CREATE FOREIGN TABLE cid_csv (
 "id" INT,
 "categoria_id" INT,
 "codigo" TEXT,
 "patologia" TEXT
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/cids/subcategorias_rel.csv',
    format 'csv',
    header 'true',
    delimiter ','
);

INSERT INTO cid  (id,cid_categoria_id,codigo,patologia)
SELECT * FROM cid_csv;

CREATE FOREIGN TABLE causa_csv (
 "nome" TEXT,
 "tipo" tipo_causa
)
SERVER file_server
OPTIONS (
    filename '/mnt/tmp/csv/causas.csv',
    format 'csv',
    header 'true',
    delimiter ','
);

INSERT INTO causa  (nome,tipo)
SELECT * FROM causa_csv;