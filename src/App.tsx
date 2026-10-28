import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { notFoundRoute, routes } from './routes';

function App() {
  const NotFound = notFoundRoute.component;
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<div role="status" aria-live="polite" className="sr-only">Loading page</div>}>
            <Routes>
              {routes.map(({ path, component: Page }) => (
                <Route key={path} path={path} element={<Page />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
