import * as React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactChildren | React.ReactChild;
}

const PageLayout = ({ children }: Props) => {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(false);
  let location = useLocation();
  let params = useParams();

  console.log('location', location);
  console.log('params', params);

  const handleToggleIconClick = () => {
    setIsNavCollapsed((prevState) => !prevState);
  }

  return (
    <Layout>
      <Sider collapsible collapsed={isNavCollapsed} onCollapse={handleToggleIconClick}>
        <div className="logo">Portfolio analyzer</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/portfolioList">Portfolio list</Link>
          </Menu.Item>
          {/* <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* <Breadcrumb>
            <Breadcrumb.Item>
            <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}

          {children}
        </Content>
      </Layout>
    </Layout>
  )
};

export { PageLayout };
