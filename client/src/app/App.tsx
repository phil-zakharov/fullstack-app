import MainPage from '~/pages/Main';

import StylesProvider from './providers/styles/Provider';
import StoreProvider from './providers/store/Provider';

import { MainLayout } from './layouts/MainLayout';

export default function App() {
  return (
    <StylesProvider>
      <StoreProvider>
          <MainLayout>
            <MainPage />
          </MainLayout>
      </StoreProvider>
    </StylesProvider>
  );
}
