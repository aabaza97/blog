import { useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

// Reader Page Component
const ReaderPage = ({ article, onBack }) => {
	const [currentPage, setCurrentPage] = useState(0);

	const goToNextPage = () => {
		if (currentPage < article.pages.length - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const progress = ((currentPage + 1) / article.pages.length) * 100;

	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			{/* Header */}
			<header className='bg-white border-b border-gray-200'>
				<div className='max-w-6xl mx-auto py-6 px-6'>
					<div className='flex justify-center items-center text-gray-600'>
						<div className='border-t border-b border-gray-400 py-2 px-4'>
							<p className='text-sm uppercase tracking-wider'>
								{article.category}
							</p>
						</div>
					</div>
				</div>
			</header>

			{/* Main content area */}
			<div className='flex-grow bg-white'>
				<div className='max-w-2xl mx-auto px-6 pt-12 pb-24'>
					<header className='mb-12 text-center'>
						<h2 className='text-3xl font-serif mb-8'>
							{article.pages[currentPage].title}
						</h2>
						<div className='border-b-2 border-black mb-8'></div>
					</header>
					<div className='prose prose-xl max-w-none'>
						<p
							className='text-gray-800 leading-relaxed font-serif first-letter:text-7xl first-letter:font-bold 
              first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]'>
							{article.pages[currentPage].content}
						</p>
					</div>
				</div>
			</div>

			{/* Bottom controls bar */}
			<div className='fixed bottom-0 left-0 right-0 border-t bg-white'>
				<div className='w-full bg-gray-200 h-1'>
					<div
						className='bg-black h-1 transition-all duration-300'
						style={{ width: `${progress}%` }}
					/>
				</div>

				{/* Added title and author bar */}
				<div className='border-b border-gray-100'>
					<div className='max-w-4xl mx-auto px-6 py-3 flex justify-between items-center'>
						<div className='flex-1'>
							<h1 className='text-xl font-serif font-bold'>
								{article.title}
							</h1>
							<p className='text-gray-600 text-sm'>
								By {article.author} • {article.date}
							</p>
						</div>
						<div className='text-gray-600 font-serif text-sm'>
							Page {currentPage + 1} of {article.pages.length}
						</div>
					</div>
				</div>

				{/* Navigation controls */}
				<div className='max-w-4xl mx-auto px-6 py-3'>
					<div className='flex items-center justify-between'>
						<button
							onClick={onBack}
							className='flex items-center text-gray-600 hover:text-black'>
							<Home className='w-5 h-5 mr-2' />
							Home
						</button>

						<div className='flex items-center space-x-4'>
							<button
								onClick={goToPreviousPage}
								disabled={currentPage === 0}
								className={`flex items-center px-4 py-2 border rounded font-serif ${
									currentPage === 0
										? 'text-gray-400 border-gray-200 cursor-not-allowed'
										: 'text-black border-gray-400 hover:bg-gray-50'
								}`}>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Previous
							</button>

							<button
								onClick={goToNextPage}
								disabled={
									currentPage === article.pages.length - 1
								}
								className={`flex items-center px-4 py-2 border rounded font-serif ${
									currentPage === article.pages.length - 1
										? 'text-gray-400 border-gray-200 cursor-not-allowed'
										: 'text-black border-gray-400 hover:bg-gray-50'
								}`}>
								Next
								<ArrowRight className='w-4 h-4 ml-2' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReaderPage;
