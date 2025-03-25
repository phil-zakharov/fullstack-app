import MainPage from '~/pages/Main';

import StylesProvider from './providers/styles/Provider';
import StoreProvider from './providers/store/Provider';

import { MainLayout } from './layouts/MainLayout';
import { ErrorBoundaryProvider } from './providers/error/Provider';
import { InitProvider } from './providers/init/Provider';

export default function App() {
  return (
    <ErrorBoundaryProvider fallback={<h1>Error</h1>}>
      <StylesProvider>
        <StoreProvider>
          <InitProvider>
            <MainLayout>
              <MainPage />
            </MainLayout>
          </InitProvider>
        </StoreProvider>
      </StylesProvider>
    </ErrorBoundaryProvider>
  );
}
