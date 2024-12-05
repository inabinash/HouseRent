import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Owner from './Owner';
import AppNavbar from './Navbar';
import Tenant from './Tenant';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/tenant" element={<Tenant />} />
      </Routes>
    </Router>
  );
}

export default App;

// import {
//     useQuery,
//     QueryClient,
//     QueryClientProvider,
//   } from "@tanstack/react-query";
//   import { gql, request } from "graphql-request";
//   import React from "react";
//   import ReactDOM from "react-dom/client";
  
  
  
//   const query = gql`
//     {
//       agreementCreateds(first: 5) {
//         id
//         ownerAddress
//         tenantAddress
//         securityDeposit
//       }
//       rentPaids(first: 5) {
//         id
//         ownerAddress
//         tenantAddress
//         datePaid
//       }
//     }
//   `;
//   const url =
//     "https://api.studio.thegraph.com/query/58361/houserent/version/latest";
  
//   export default function App() {
//     const { data, status } = useQuery({
//       queryKey: ["data"],
//       async queryFn() {
//         return await request(url, query);
//       },
//     });
  
//     console.log("data, status", data, status);
  
  
//     return (
//       <main>
//         {status === "pending" ? <div>Loading...</div> : null}
//         {status === "error" ? (
//           <div>Error ocurred querying the Subgraph</div>
//         ) : null}
//         <div>{JSON.stringify(data ?? {})}</div>
//       </main>
//     );
//   }
  
  
  
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 1000,
//       },
//     },
//   });
