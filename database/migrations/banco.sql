-- SQLBook: Code
USE pagamentos;

CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('comum', 'lojista') NOT NULL DEFAULT 'comum',
  PRIMARY KEY (id)
);

CREATE TABLE carteiras (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  saldo DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE transferencias (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario_origem INT NOT NULL,
  id_usuario_destino INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario_origem) REFERENCES usuarios (id),
  FOREIGN KEY (id_usuario_destino) REFERENCES usuarios (id)
);
