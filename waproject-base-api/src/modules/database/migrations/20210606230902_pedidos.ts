import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> { 
    await knex.schema.createTable('Pedidos', table => {
        table.increments('id').primary();
        table.string('Notebook').notNullable();
        table.string('Cor').notNullable();
        table.string('Quantidade').notNullable();
        table.string('Valor').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> { 
    await knex.schema.dropTable('Pedidos');
}