-- batch insert
insert into usuarios (id, nome, cpf, email, senha, tipo)
values
    (4, 'Pagador', '06700446015', 'pagador@mail.com', '123mudar', 'comum'),
    (15, 'Lojista', '08377640090', 'lojista@mail.com', '123mudar', 'lojista');

insert into carteiras (id_usuario, saldo)
values
    (4, 10),
    (15, 1000);
