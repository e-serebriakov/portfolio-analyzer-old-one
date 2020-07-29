import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

type Props = {
  children: React.ReactChildren | React.ReactChild;
}

const PageLayout = ({ children }: Props) => {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);
  // let location = useLocation();
  // let params = useParams();

  const handleToggleIconClick = () => {
    setIsNavCollapsed((prevState) => !prevState);
  };

  return (
    <Layout>
      <Sider collapsible collapsed={isNavCollapsed} onCollapse={handleToggleIconClick}>
        <div className="logo">Portfolio analyzer</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/portfolioList">Portfolio list</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<DatabaseOutlined />}>
            <Link to="/operationHistory">Operations history</Link>
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
  );
};

export { PageLayout };
