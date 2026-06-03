import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import MainPage from "@/components/MainPage";

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider delayDuration={300}>
        <MainPage />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
