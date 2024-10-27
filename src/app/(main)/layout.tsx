import { Header } from './_components/header';

type MainLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const MainLayout = ({ children, modal }: MainLayoutProps) => (
  <>
    <Header />
    {modal}
    {children}
  </>
);

export default MainLayout;
