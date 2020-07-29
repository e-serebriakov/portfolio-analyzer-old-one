import * as React from 'react';
import { PageHeader } from 'antd';
import { useParams } from 'react-router-dom';

import { useRequest } from 'src/lib/hooks/useRequest';
import { OperationListTable } from './operationListTable/OperationListTable';

export enum OperationType {
  CashDeposit = 'CASH_DEPOSIT',
  CashWithdrawal = 'CASH_WITHDRAWAL',
  SecurityBuying = 'SECURITY_BUYING',
  SecuritySelling = 'SECURITY_SELLING',
}

export enum OperationCurrency {
  Rub = 'RUB',
  Usd = 'UDS',
}

export type Operation = {
  target: string;
  type: OperationType;
  currency: OperationCurrency;
  quantity: number;
  price: number;
  fee: number;
  date: Date;
};

type Portfolio = {
  name: string,
  operations: Operation[];
}

const PortfolioPage = () => {
  const { id } = useParams();

  const [{ data, error }] = useRequest<Portfolio | null>({
    method: 'GET',
    url: `/portfolios/${id}`,
  }, null);

  if (!data) {
    return null;
  }

  return (
    <>
      <PageHeader
        title={data.name}
      />
      { error && <p>{error}</p>}

      <OperationListTable data={data.operations} />
    </>
  );
};

export { PortfolioPage };
