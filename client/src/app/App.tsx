import { MainPage } from '~/pages/Main';

import StylesProvider from './providers/styles/Provider';
import StoreProvider from './providers/store/Provider';

import { MainLayout } from './layouts/MainLayout';
import { ErrorBoundaryProvider } from './providers/error/Provider';
import { InitProvider } from './providers/init/Provider';
import { TodoListPage } from '~/pages/TodoList';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  return (
    <ErrorBoundaryProvider fallback={<h1>Error</h1>}>
      <BrowserRouter>
        <StylesProvider>
          <StoreProvider>
            <InitProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/todo" element={<TodoListPage />} />
                </Routes>
              </MainLayout>
            </InitProvider>
          </StoreProvider>
        </StylesProvider>
      </BrowserRouter>
    </ErrorBoundaryProvider>
  );
}
