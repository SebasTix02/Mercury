import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { dataProvider, liveProvider } from "./providers";
import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { ForgotPassword, Login, Register, Home, ListaUsuarios, Inventario } from "./pages";
import Layout from "./components/layout";
import { resources as allResources } from "./config/resources";
import { Categorias } from "./pages/category/category";
import { Etiquetas } from "./pages/labels/labels";
import { Many } from "./pages/many/many";
import { Buildings } from "./pages/building/building";
import { Locations } from "./pages/location/location";
import { Brands } from "./pages/brand/brand";
import { Dependency } from "./pages/dependency/dependency";
import { Software } from "./pages/inventory/software";
import { Inventario_Computadores } from "./pages/inventory/computers";
import { Inventario_Bienes } from "./pages/inventory/bienes";
import Reports from "./pages/reports/reports";
import { Repotenciacion } from "./pages/repower";
import { QRScanner } from "./pages/qr_scanner/qr_scanner";
import TransferAssets from "./pages/inventory/transfer/transfer";
import ProtectedRoute from './components/ProtectedRoute';
import { getPermissions } from './providers/options/login';

const App = () => {
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const role = getPermissions();
    const allowedResources = allResources.filter((resource:any) => {
      if (!resource.roles) return true;
      return resource.roles.includes(role);
    });
    setFilteredResources(allowedResources);
  }, []);

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
                resources={filteredResources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "XQGdjt-bgi5r1-sSYWgr",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/registrarse" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/usuarios" element={<ProtectedRoute roles={['ADMIN']}><ListaUsuarios /></ProtectedRoute>} />
                  <Route path="/inventario" element={<ProtectedRoute><Inventario /></ProtectedRoute>} />
                  <Route path="/varios" element={<ProtectedRoute><Many /></ProtectedRoute>} />
                  <Route path="/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
                  <Route path="/etiquetas" element={<ProtectedRoute><Etiquetas /></ProtectedRoute>} />
                  <Route path="/bloques" element={<ProtectedRoute><Buildings /></ProtectedRoute>} />
                  <Route path="/ubicaciones" element={<ProtectedRoute><Locations /></ProtectedRoute>} />
                  <Route path="/marcas" element={<ProtectedRoute><Brands /></ProtectedRoute>} />
                  <Route path="/dependencias" element={<ProtectedRoute><Dependency /></ProtectedRoute>} />
                  <Route path="/software" element={<ProtectedRoute><Software /></ProtectedRoute>} />
                  <Route path="/computadores" element={<ProtectedRoute><Inventario_Computadores /></ProtectedRoute>} />
                  <Route path="/computadores/:scannedCode" element={<ProtectedRoute><Inventario_Computadores /></ProtectedRoute>} />
                  <Route path="/reportes" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                  <Route path="/repotenciar/:id" element={<ProtectedRoute><Repotenciacion /></ProtectedRoute>} />
                  <Route path="/escaner" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />
                  <Route path="/bienes" element={<ProtectedRoute><Inventario_Bienes /></ProtectedRoute>} />
                  <Route path="/bienes/:scannedCode" element={<ProtectedRoute><Inventario_Bienes /></ProtectedRoute>} />
                  <Route path="/transferencia" element={<ProtectedRoute><TransferAssets /></ProtectedRoute>} />
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
};

export default App;
