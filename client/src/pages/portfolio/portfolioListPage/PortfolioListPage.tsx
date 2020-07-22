import * as React from 'react';
import { List, PageHeader } from 'antd';
import { Link } from 'react-router-dom';

import { useRequest } from 'src/lib/hooks/useRequest';

type Portfolio = {
  _id: string;
  name: string,
  operations: string[];
}

const PortfolioListPage = () => {
  const [{ data, error }] = useRequest<Portfolio[]>({
    method: 'get',
    url: '/portfolios',
  }, []);

  return (
    <>
      <PageHeader
        title="Portfolio list"
      />
      { error && <p>{error}</p>}
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`portfolioList/${item._id}`}>{item.name}</Link>}
              description="Lorem ipsum"
            />
          </List.Item>
        )}
      />
    </>
  )
}

export { PortfolioListPage };
