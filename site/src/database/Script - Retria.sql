create database retria;

use retria;

create table empresa(
	id_empresa int auto_increment,
    nome_mpresa varchar(45),
    cnpj char(14),
    telefone_01 varchar(11),
    telefone_02 varchar(11),
    email varchar(45),
    responsavel_empresa varchar(45),
    fk_matriz int default null,
    primary key(id_empresa),
    foreign key(fk_matriz) references empresa(id_empresa)
);
    
create table endereco(
	id_endereco int auto_increment,
    cep char(8),
    numero varchar(8),
    complemento varchar(45) NOT NULL,
    fk_empresa int,
    primary key (id_endereco),
    foreign key (fk_empresa) references empresa(id_empresa)
);

create table administrador(
	id_administrador int auto_increment,
	nome_administrador varchar(45),
    email_administrador varchar(90),
    senha_administrador varchar(256),
    telefone_administrador varchar(11),
    ocupacao varchar(45),
    chave_seguranca_administrador varchar(45),
    fk_empresa int,
    primary key (id_administrador, fk_empresa),
    unique (fk_empresa),
    foreign key (fk_empresa) references empresa(id_empresa)
);
ALTER TABLE `administrador` 
ADD CONSTRAINT `user.email_validation` 
    CHECK (`email_administrador` REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._
    -]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$");

create table maquina_ultrassom(
	id_maquina int auto_increment,
    nome_fornecedor varchar(45),
    tipo_maquina varchar(45),
    sistema_operacional varchar(45),
    setor varchar(45),
    andar int,
    fk_administrador int,
    fk_empresa int,
    primary key(id_maquina, fk_administrador, fk_empresa),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa)
);

create table especificacao_componente(
	id_especificacao_componente int auto_increment,
    tipo varchar(45),
    nome_fabricante varchar(45),
    descricao_componente VARCHAR(255),
    primary key (id_especificacao_componente)
);
    
create table maquina_ultrassom_especificada(
    id_especificacao_componente_maquina int AUTO_INCREMENT,
    numero_serial varchar(45),
    uso_maximo double,
    frequencia_maxima double,
    fk_maquina int,
    fk_administrador int,
    fk_empresa int,
    fk_especificacao_componente int,
    primary key (id_especificacao_componente_maquina, fk_maquina, fk_administrador, fk_empresa, fk_especificacao_componente),
    foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa),
    foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente)
);

create table metrica_componente(
	id_metrica_componente int auto_increment,
	dt_metrica datetime,
    uso double,
    frequencia double,
    fk_maquina int,
    fk_administrador int,
    fk_empresa int,
    fk_especificacao_componente int,
    primary key (id_metrica_componente,fk_maquina,fk_administrador,fk_empresa,fk_especificacao_componente),
    foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa),
    foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente)
);

create table alerta(
	id_alerta int auto_increment,
    dt_alerta datetime,
    tipo_alerta varchar(255),
    fk_metrica_componente int,
    fk_maquina int,
    fk_administrador int, 
    fk_empresa int, 
    fk_especificacao_componente int,
    primary key (id_alerta, tipo_alerta, fk_metrica_componente,fk_maquina,fk_administrador,fk_empresa,fk_especificacao_componente),
	foreign key (fk_maquina) references maquina_ultrassom(id_maquina),
    foreign key (fk_administrador) references administrador(id_administrador),
    foreign key (fk_empresa) references empresa(id_empresa),
    foreign key (fk_especificacao_componente) references especificacao_componente(id_especificacao_componente),
    foreign key (fk_metrica_componente) references  metrica_componente(id_metrica_componente)
);


-- Script da Azure
CREATE TABLE empresa (
    id_empresa INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_empresa),
    nome_empresa VARCHAR(45),
    cnpj CHAR(14),
    telefone_01 VARCHAR(11),
    telefone_02 VARCHAR(11),
    email VARCHAR(45),
    responsavel_empresa VARCHAR(45),
    fk_matriz INT DEFAULT NULL,
        FOREIGN KEY (fk_matriz) REFERENCES empresa(id_empresa)
);

CREATE TABLE endereco (
    id_endereco INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_endereco),
    cep CHAR(8),
    numero VARCHAR(8),
    complemento VARCHAR(45) NOT NULL,
    fk_empresa INT,
        FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE ocupacao (
    id_ocupacao INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_ocupacao)
    nome_ocupacao VARCHAR(45),
);  

CREATE TABLE administrador (
    id_administrador INT IDENTITY(1,1) UNIQUE,
    nome_administrador VARCHAR(45),
    email_administrador VARCHAR(90),
        CONSTRAINT chkEmail CHECK (email_administrador LIKE '%@%.%' AND email_administrador NOT LIKE '@%' and email_administrador NOT LIKE '%.'), 
    senha_administrador VARCHAR(256),
    telefone_administrador VARCHAR(11),
    chave_seguranca_administrador VARCHAR(45),
    fk_ocupacao INT, 
        REFERENCES ocupacao(id_ocupacao),
    fk_empresa INT,
        PRIMARY KEY (id_administrador, fk_empresa),
        UNIQUE (fk_empresa),
        FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE maquina_ultrassom (
    id_maquina INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_maquina),
    sistema_operacional VARCHAR(45),
    numero_serial_maquina VARCHAR(45),
    fk_administrador INT,
        FOREIGN KEY (fk_administrador) REFERENCES administrador(id_administrador),
    fk_empresa INT,
        FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE tipo_componente (
    id_tipo_componente INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_tipo_componente)
    nome_tipo_componente VARCHAR(45),
);

CREATE TABLE especificacao_componente (
    id_especificacao_componente INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_especificacao_componente)
    descricao_componente VARCHAR(255),
    nome_fabricante VARCHAR(45),
    numero_serial VARCHAR(45),
    fk_tipo_componente INT,
        FOREIGN KEY (fk_tipo_componente) REFERENCES tipo_componente(id_tipo_componente)
);

CREATE TABLE maquina_ultrassom_especificada (
    id_especificacao_componente_maquina INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_especificacao_componente_maquina),
    uso_maximo FLOAT,
    frequencia_maxima FLOAT,
    fk_maquina INT,
        FOREIGN KEY (fk_maquina) REFERENCES maquina_ultrassom(id_maquina),
    fk_especificacao_componente INT,
        FOREIGN KEY (fk_especificacao_componente) REFERENCES especificacao_componente(id_especificacao_componente)
);

CREATE TABLE metrica_componente (
    id_metrica_componente INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_metrica_componente),
    dt_metrica DATETIME,
    uso FLOAT,
    frequencia FLOAT,
    fk_especificacao_componente_maquina INT,
        FOREIGN KEY (fk_especificacao_componente_maquina) REFERENCES maquina_ultrassom_especificada(id_especificacao_componente_maquina)
);

CREATE TABLE tipo_alerta (
    id_tipo_alerta INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_tipo_alerta)
    nome_tipo_alerta VARCHAR(45),
    descricao_alerta VARCHAR(255)
);

CREATE TABLE alerta (
    id_alerta INT IDENTITY(1,1) UNIQUE,
        PRIMARY KEY (id_alerta),
    dt_alerta DATETIME,
    fk_tipo_alerta INT,
        FOREIGN KEY (fk_tipo_alerta) REFERENCES tipo_alerta(id_tipo_alerta),    
    fk_metrica_componente INT,
        FOREIGN KEY (fk_metrica_componente) REFERENCES metrica_componente(id_metrica_componente)
);

-- Drop tables 
drop table [dbo].[tipo_alerta];
drop table [dbo].[alerta];
drop table [dbo].[metrica_componente];
drop table [dbo].[maquina_ultrassom_especificada];
drop table [dbo].[maquina_ultrassom];
drop table [dbo].[tipo_componente];
drop table [dbo].[especificacao_componente];
drop table [dbo].[endereco];
drop table [dbo].[ocupacao];
drop table [dbo].[administrador];
drop table [dbo].[empresa];