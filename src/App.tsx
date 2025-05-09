import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ScrollRestoration } from 'react-router-dom';

const App = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
