// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Dapp } from "./components/Dapp";

// // We import bootstrap here, but you can remove if you want
// import "bootstrap/dist/css/bootstrap.css";

// // This is the entry point of your application, but it just renders the Dapp
// // react component. All of the logic is contained in it.

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <Dapp />
//   </React.StrictMode>
// );
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import React from 'react';
import ReactDOM from 'react-dom/client';
const query = gql`{
  agreementCreateds(first: 5) {
    id
    ownerAddress
    tenantAddress
    securityDeposit
  }
  rentPaids(first: 5) {
    id
    ownerAddress
    tenantAddress
    datePaid
  }
}`
const url = 'https://api.studio.thegraph.com/query/58361/houserent/version/latest'
export default function App() {
  const { data, status } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, query)
    }
  })
  return (
    <main>
      {status === 'pending' ? <div>Loading...</div> : null}
      {status === 'error' ? <div>Error ocurred querying the Subgraph</div> : null}
      <div>{JSON.stringify(data ?? {})}</div>
    </main>
  )
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
      