import * as React from 'react';
import { List } from 'antd';
import {
  useParams
} from "react-router-dom";

import { useRequest } from 'src/lib/hooks/useRequest';

type Operation = {
  name: string;
  date: Date;
}

type Portfolio = {
  name: string,
  operations: Operation[];
}

const PortfolioPage = () => {
  const { id } = useParams();

  const [{ data, isLoading, error }] = useRequest<Portfolio | null>({
    method: 'get',
    url: `/portfolios/${id}`,
  }, null);

  if (!data) {
    return null;
  }

  return (
    <>
      { error && <p>{error}</p>}
      <List
        itemLayout="horizontal"
        dataSource={data.operations}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description="Lorem ipsum"
            />
          </List.Item>
        )}
      />
    </>
  )
}

export { PortfolioPage };
