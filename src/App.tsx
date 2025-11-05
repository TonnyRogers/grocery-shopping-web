import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Router } from "./routes/router";
import ShoppingCartProvider from "./contexts/ShppingCartProvider";
import { useDisableZoom } from "./hooks/use-disable-zoom";

const queryClient = new QueryClient();

const App = () => {
  useDisableZoom();
  
	return (
		<ShoppingCartProvider>
			<QueryClientProvider client={queryClient}>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<Router />
				</TooltipProvider>
			</QueryClientProvider>
		</ShoppingCartProvider>
	);
};

export default App;
