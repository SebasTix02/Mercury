import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {authProvider, dataProvider,
  liveProvider,
} from "./providers";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {ForgotPassword, Login, Register, Home, ListaUsuarios, Inventario} from "./pages"
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { Categorias } from "./pages/category/category";
import { Many } from "./pages/many/many";
import { Buildings } from "./pages/building/building";
import { Locations } from "./pages/location/location";
import { Brands } from "./pages/brand/brand";
import { Dependency } from "./pages/dependency/dependency";
import { Software } from "./pages/inventory/software";
import { Inventario_Computadores } from "./pages/inventory/computers";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "XQGdjt-bgi5r1-sSYWgr",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                  <Route path="/registrarse" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/" element={<Home />} />
                  <Route path="/usuarios" element={<ListaUsuarios />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route path="/varios" element={<Many />} />
                  <Route path="/categorias" element={<Categorias />} />
                  <Route path="/bloques" element={<Buildings />} />
                  <Route path="/ubicaciones" element={<Locations />} />
                  <Route path="/marcas" element={<Brands />} />
                  <Route path="/dependencias" element={<Dependency />} />
                  <Route path="/software" element={<Software />} />
                  <Route path="/computadores" element={<Inventario_Computadores />} />

                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </AntdApp>
        </>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
