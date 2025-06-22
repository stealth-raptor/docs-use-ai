import { Toaster } from 'sonner';
import DashboardProvider from './provider.jsx';
import { ThemeProvider } from '@/components/ui/theme-provider';

const DashboardLayout = ({ children }) => {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
      <DashboardProvider>
        <div className="p-10">
          {children}
          <Toaster />
        </div>
      </DashboardProvider>
    // </ThemeProvider>
  );
};

export default DashboardLayout;
