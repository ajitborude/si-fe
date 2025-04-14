import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeSwitch } from './components/common/theme-switch';
import { ThemeProvider } from './components/providers/theme-provider';
import { appRoutes } from './routes';

const router = createBrowserRouter(appRoutes);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <div className="flex flex-col items-center justify-center min-h-svh bg-background">
        <Button variant="destructive">Click me</Button>
      </div> */}
      <RouterProvider router={router} />
      <ThemeSwitch />
    </ThemeProvider>
  );
}

export default App;
