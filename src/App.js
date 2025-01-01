import React, { useState } from 'react';
import articles from './articles.data';

import HomePage from './Home';
import ReaderPage from './Reader';

// Main App Component
const App = () => {
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

export default App;
