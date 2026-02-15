import AppRoutes from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { IAMProvider } from "./context/IAMContext";
import { MultiTenantProvider } from "./context/MultiTenantContext";

export default function App() {
  return (
    <ThemeProvider>
      <MultiTenantProvider>
        <IAMProvider>
          <AppRoutes />
        </IAMProvider>
      </MultiTenantProvider>
    </ThemeProvider>
  );
}
