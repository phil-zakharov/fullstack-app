import MainPage from '~/pages/Main';

import StylesProvider from './providers/styles/Provider';
import StoreProvider from './providers/store/Provider';

import { MainLayout } from './layouts/MainLayout';
import { ErrorBoundaryProvider } from './providers/error/Provider';

export default function App() {
  return (
    <ErrorBoundaryProvider fallback={<h1>Error</h1>}>
      <StylesProvider>
        <StoreProvider>
          <MainLayout>
            <MainPage />
          </MainLayout>
        </StoreProvider>
      </StylesProvider>
    </ErrorBoundaryProvider>
  );
}
