import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/constants';

import { OperationSchema } from './schemas/operation.schema';
import { OPERATION_MODEL } from './constants';

export const operationProviders = [
  {
    provide: OPERATION_MODEL,
    useFactory: (connection: Connection) => connection.model('Operation', OperationSchema),
    inject: [DATABASE_CONNECTION],
  },
];
