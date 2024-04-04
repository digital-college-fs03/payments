import knex from "knex";

export default knex({
    client: 'mysql2',
    connection: {
      host: 'devi.tools',
      port: 3360,
      database: 'pagamentos',
      user: 'root',
      password: 'root',
    },
  });
