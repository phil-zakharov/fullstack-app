import MainPage from '~/pages/Main';

import StylesProvider from './providers/styles/Provider';
import QueriesProvider from './providers/queries/Provider';
import { MainLayout } from './layouts/MainLayout';

export default function App() {
  return (
    <StylesProvider>
      <QueriesProvider>
        <MainLayout>
          <MainPage />
        </MainLayout>
      </QueriesProvider>
    </StylesProvider>
  );
}
