import * as React from 'react';
import { Table } from 'antd';

import { Operation } from '../PortfolioPage';

const columns = [
  {
    title: 'Target',
    dataIndex: 'target',
    key: 'target',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
  },
  {
    title: 'Total price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

type Props = {
  data: Operation[];
}

const OperationListTable = ({ data }: Props) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}

export { OperationListTable };
