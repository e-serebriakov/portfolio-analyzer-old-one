import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      mongoose.set('useFindAndModify', false);

      // @TODO Is it a good idea?
      mongoose.set('toJSON', {
        virtuals: true,
        transform: (_: mongoose.Document, converted: { _id: string, __v: string }) => {
          delete converted._id;
          delete converted.__v;
        }
      })

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
