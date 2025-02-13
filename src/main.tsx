import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetails from './pages/products/[id]';


export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				element: <ProtectedRoute />, // Protects the landing page
				children: [
					{
						path: '/',
						element: <Landing />
					},
					{
						path: "/products/:id", // Dynamic route for product details
						element: <ProductDetails />,
					  },
				]
			},
			{
				path: '/login',
				element: <Login />
			}
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
