import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from './components/providers/theme-provider';
import { appRoutes } from './routes';

const router = createBrowserRouter(appRoutes);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
