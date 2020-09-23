import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Header from '../Header';
import Footer from '../Footer';
import PageSchema from '../PageSchema';
import SubscriptionPopup from '../SubscriptionPopup';
import { MyContext } from '../../context/Context';
import './styles.scss';

const Layout = ({ className, children, overflow }: LayoutProps) => {
  const [open, setOpen] = React.useContext(MyContext);
  return (
    <>
      <a href="#main" className="bp-skipLink">
        <span>Skip to content</span>
      </a>
      <Header />
      <SubscriptionPopup open={open} setOpen={setOpen} />
      <PageSchema type={'WebSite'} />
      <main
        id="main"
        aria-label="Main Content"
        className={classNames('bp-page', className === 'home' ? 'p0' : null)}
        style={overflow ? { overflow: overflow } : {}}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

interface LayoutProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  overflow?: string;
}
