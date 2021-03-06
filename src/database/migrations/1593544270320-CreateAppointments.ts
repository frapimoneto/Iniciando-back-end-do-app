import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1593544270320 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy:'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'provider',
                        type: 'varchar'
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
            ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}

// Evita que os bancos de dados estejam em versões diferentes, atualiza pra todos os devs no projeto

// Só é possível alterar uma migration se ela não foi enviada pra um controle de versão (Git...) senão é necessário criar uma nova migration para fazer as alterações