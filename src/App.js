import React, { useState } from 'react';
import articles from './articles.data';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './Home';
import ReaderPage from './Reader';
import AdminDashboard from './Admin';

// Main Reader Component
const Reader = () => {
	const [selectedArticle, setSelectedArticle] = useState(null);

	return (
		<div>
			{selectedArticle ? (
				<ReaderPage
					article={selectedArticle}
					onBack={() => setSelectedArticle(null)}
				/>
			) : (
				<HomePage
					articles={articles}
					onArticleSelect={setSelectedArticle}
				/>
			)}
		</div>
	);
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
	// This is a simple implementation. In a real app, you'd want to add proper authentication
	const isAuthenticated = true; // Replace with actual auth check

	if (!isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return children;
};

// Main App Component
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Reader />} />
				<Route
					path='/admin'
					element={
						<ProtectedRoute>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
