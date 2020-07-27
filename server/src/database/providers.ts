import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      mongoose.set('useFindAndModify', false);

      const connection = mongoose
        .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
          user: process.env.DB_USER,
          pass: process.env.DB_PASSWORD,
        });

      return connection;
    }
    ,
  },
];
