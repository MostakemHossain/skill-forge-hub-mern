import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import './index.css';
import router from './routes/router';
const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />

    </QueryClientProvider>
   
  
)
