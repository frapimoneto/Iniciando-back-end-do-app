import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterProviderFildToProviderId1593617600055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('appointments', 'provider');
        
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable:true,
        }))

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider',
                type: 'varchar'
        }))
    }

}


// Essa migration foi criada para exemplificar o que deve ser feito caso
// seja necessário alterar alguma coisa na migration mas ela ja está no Git pro time inteiro
// pois nao pode simplismente alterar uma migration ja criada quando ela já está nessa etapa 