FROM postgres:17.5

ENV  POSTGRES_INITDB_ARGS='--lc-numeric=pt_BR.UTF-8 --lc-monetary=pt_BR.UTF-8 --lc-collate=pt_BR.UTF-8 --lc-ctype=pt_BR.UTF-8'
ENV  POSTGRESQL_LOGGING_COLLECTOR="on"
ENV  POSTGRESQL_LOG_DIRECTORY="/var/log/postgresql"
ENV  POSTGRESQL_LOG_FILENAME="postgresql.log"
ENV  POSTGRESQL_LOG_STATEMENT="all"
ENV  POSTGRESQL_LOG_DURATION="on"
ENV  POSTGRESQL_LOG_MIN_DURATION_STATEMENT="1000"

COPY ./initdb.sql /docker-entrypoint-initdb.d/1.sql
COPY ./scripts/loadForeignTables.sql /docker-entrypoint-initdb.d/2.sql
COPY ./scripts/insertTipoDeUsuarios.sql /docker-entrypoint-initdb.d/3.sql

# Instalar pacotes de localidade
RUN apt-get update && apt-get install -y locales

# Gerar o locale pt_BR.UTF-8
RUN sed -i '/pt_BR.UTF-8/s/^# //g' /etc/locale.gen \
    && locale-gen

# Definir o locale no ambiente do sistema
ENV LANG=en_US \
    LANGUAGE=en_US \
    LC_ALL=pt_BR.UTF-8

EXPOSE 5432