import { MainPage } from '~/pages/Main';

import StylesProvider from './providers/styles/Provider';
import StoreProvider from './providers/store/Provider';

import { MainLayout } from './layouts/MainLayout';
import { ErrorBoundaryProvider } from './providers/error/Provider';
import { InitProvider } from './providers/init/Provider';
import { TodoListPage } from '~/pages/TodoList';
import { BrowserRouter, Route, Routes } from 'react-router';
import { UsersPage } from '~/pages/Users';
import { PostsPage } from '~/pages/Posts';
import { AuthGuard } from '~/pages/AuthGuard';

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
                  <Route
                    path="/*"
                    element={
                      <AuthGuard>
                        <Routes>
                          <Route path="/todo" element={<TodoListPage />} />
                          <Route path="/users" element={<UsersPage />} />
                          <Route path="/posts" element={<PostsPage />} />
                        </Routes>
                      </AuthGuard>
                    }
                  ></Route>
                </Routes>
              </MainLayout>
            </InitProvider>
          </StoreProvider>
        </StylesProvider>
      </BrowserRouter>
    </ErrorBoundaryProvider>
  );
}
