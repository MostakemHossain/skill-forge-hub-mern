import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import 'swiper/css';
import './index.css';
import router from './routes/router';
import AuthProvider from './utilities/providers/AuthProvider';
const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

    </QueryClientProvider>
  </AuthProvider>


)
