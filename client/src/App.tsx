import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/not-found";
import ContactsPage from "@/pages/ContactsPage"; 
import CompanyPage from "@/pages/CompanyPage"; 

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/projects" component={Projects} />
      <Route path="/contacts" component={ContactsPage} /> 
      <Route path="/company" component={CompanyPage} /> 
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
