// Home Page Component
const HomePage = ({ articles, onArticleSelect }) => {
	return (
		<div className='min-h-screen bg-gray-100'>
			{/* Newspaper Header */}
			<header className='bg-white border-b border-gray-200'>
				<div className='max-w-6xl mx-auto py-8 px-6'>
					<h1 className='text-6xl font-serif text-center font-bold mb-4'>
						The Daily Reader
					</h1>
					<div className='flex justify-center items-center text-gray-600'>
						<div className='border-t border-b border-gray-400 py-2 px-4'>
							<p className='text-sm'>
								WEDNESDAY, JANUARY 1, 2025
							</p>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='max-w-6xl mx-auto bg-white my-8 p-8 shadow-sm'>
				{/* Featured Article */}
				{articles
					.filter((article) => article.featured)
					.map((article) => (
						<div
							key={article.id}
							className='mb-12'
							onClick={() => onArticleSelect(article)}>
							<div className='border-b-2 border-black mb-4'>
								<span className='text-sm font-bold uppercase tracking-wider'>
									{article.category}
								</span>
							</div>
							<article className='cursor-pointer hover:bg-gray-50 p-4'>
								<h2 className='text-4xl font-serif font-bold mb-4'>
									{article.title}
								</h2>
								<p className='text-gray-600 text-sm mb-3'>
									By {article.author} | {article.date}
								</p>
								<p className='text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left'>
									{article.preview}
								</p>
							</article>
						</div>
					))}

				{/* Other Articles Grid */}
				<div className='grid grid-cols-2 gap-8 border-t-2 border-black pt-8'>
					{articles
						.filter((article) => !article.featured)
						.map((article) => (
							<article
								key={article.id}
								className='cursor-pointer hover:bg-gray-50 p-4'
								onClick={() => onArticleSelect(article)}>
								<div className='border-b border-gray-200 mb-3'>
									<span className='text-sm font-bold uppercase tracking-wider'>
										{article.category}
									</span>
								</div>
								<h3 className='text-2xl font-serif font-bold mb-2'>
									{article.title}
								</h3>
								<p className='text-gray-600 text-sm mb-3'>
									By {article.author} | {article.date}
								</p>
								<p className='text-base leading-relaxed'>
									{article.preview}
								</p>
							</article>
						))}
				</div>
			</main>
		</div>
	);
};

export default HomePage;
