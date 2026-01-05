import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Footer } from './layouts/footer';
import { Header } from './layouts/header';

// Pages
import { CollectionsListPage } from './pages/collections/collections-list.page';
import { CollectionDetailPage } from './pages/collections/collection-detail.page';
import { AdminPage } from './pages/admin/admin.page';
import { NotFoundPage } from './pages/not-found.page';
import { ManagePokemonPage } from './pages/admin/pokemon/manage-pokemon.page';
import { ManageCollectionsPage } from './pages/admin/collections/manage-collections.page';
import { AuthProvider } from '@features/auth/context/auth.provider';
import { LoginPage } from './pages/auth/login.page';
import { SignupPage } from './pages/auth/signup.page';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="bg-gray-100 text-gray-900 transition-colors duration-500 dark:bg-gray-900 dark:text-gray-100">
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <div className="min-h-screen w-full">
                            <Header />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<CollectionsListPage />}
                                />
                                <Route
                                    path="/collections"
                                    element={<CollectionsListPage />}
                                />
                                <Route
                                    path="/collections/:slug"
                                    element={<CollectionDetailPage />}
                                />
                                <Route path="/admin" element={<AdminPage />} />
                                <Route
                                    path="/admin/pokemon"
                                    element={<ManagePokemonPage />}
                                />
                                <Route
                                    path="/admin/collections"
                                    element={<ManageCollectionsPage />}
                                />

                                <Route
                                    path="/auth/login"
                                    element={<LoginPage />}
                                />
                                <Route
                                    path="/auth/signup"
                                    element={<SignupPage />}
                                />

                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </div>
                        <Footer />
                    </AuthProvider>
                </QueryClientProvider>
            </div>
        </BrowserRouter>
    );
};
