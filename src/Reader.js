import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import DOMPurify from 'dompurify';

// Touch Handler Hook
const useSwipe = (onSwipeLeft, onSwipeRight) => {
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	const minSwipeDistance = 50;

	const onTouchStart = (e) => {
		setTouchEnd(null);
		setTouchStart(e.touches[0].clientX);
	};

	const onTouchMove = (e) => {
		setTouchEnd(e.touches[0].clientX);
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			onSwipeLeft();
		}
		if (isRightSwipe) {
			onSwipeRight();
		}
	};

	return {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
	};
};

// RTL Detection Hook
const useRTLDetection = (content, title) => {
	const [isRTL, setIsRTL] = useState(false);

	useEffect(() => {
		// Comprehensive RTL script detection
		const rtlRegex =
			/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

		// Check both title and content for RTL characters
		const hasRTLContent = rtlRegex.test(content) || rtlRegex.test(title);

		// If RTL characters are detected, set to RTL mode
		setIsRTL(hasRTLContent);
	}, [content, title]);

	return [isRTL, setIsRTL];
};

// Reader Page Component
const ReaderPage = ({ article, onBack }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [isRTL] = useRTLDetection(
		article.pages[currentPage].content,
		article.pages[currentPage].title
	);

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

	const swipeHandlers = useSwipe(
		() => (isRTL ? goToPreviousPage() : goToNextPage()),
		() => (isRTL ? goToNextPage() : goToPreviousPage())
	);

	useEffect(() => {
		const handleKeyPress = (e) => {
			switch (e.key) {
				case 'ArrowRight':
					isRTL ? goToPreviousPage() : goToNextPage();
					break;
				case 'ArrowLeft':
					isRTL ? goToNextPage() : goToPreviousPage();
					break;
				case 'Home':
					onBack();
					break;
				default:
					break;
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [currentPage, isRTL]);

	const progress = ((currentPage + 1) / article.pages.length) * 100;

	// Function to safely render HTML content
	const createMarkup = (content) => {
		return {
			__html: DOMPurify.sanitize(content, {
				ALLOWED_TAGS: [
					'p',
					'b',
					'i',
					'em',
					'strong',
					'a',
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'ul',
					'ol',
					'li',
					'blockquote',
					'code',
					'pre',
					'br',
					'div',
					'span',
					'sub',
					'sup',
					'strike',
					'u',
				],
				ALLOWED_ATTR: [
					'href',
					'target',
					'rel',
					'style',
					'class',
					'data-*',
					'id',
				],
				ALLOWED_STYLES: [
					'text-align',
					'color',
					'background-color',
					'font-size',
					'font-family',
					'margin',
					'margin-left',
					'margin-right',
					'padding',
					'text-indent',
				],
			}),
		};
	};

	// Content processing for Quill
	const processContent = (content) => {
		// Sanitize the content first
		const sanitizedContent = DOMPurify.sanitize(content, {
			ALLOWED_TAGS: [
				'p',
				'b',
				'i',
				'em',
				'strong',
				'a',
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'ul',
				'ol',
				'li',
				'blockquote',
				'code',
				'pre',
				'br',
				'div',
				'span',
				'sub',
				'sup',
				'strike',
				'u',
			],
			ALLOWED_ATTR: [
				'href',
				'target',
				'rel',
				'style',
				'class',
				'data-*',
				'id',
			],
			ALLOWED_STYLES: [
				'text-align',
				'color',
				'background-color',
				'font-size',
				'font-family',
				'margin',
				'margin-left',
				'margin-right',
				'padding',
				'text-indent',
			],
		});

		const div = document.createElement('div');
		div.innerHTML = sanitizedContent;

		// Find the first substantial paragraph
		const firstP = Array.from(div.children).find((el) => {
			const text = el.textContent.trim();
			return (
				text.length > 0 && (el.tagName === 'P' || el.tagName === 'DIV')
			);
		});

		let firstParagraphText = '';
		let remainingContent = '';

		if (firstP) {
			firstParagraphText = firstP.innerHTML;
			firstP.remove();
			remainingContent = div.innerHTML;
		} else {
			remainingContent = sanitizedContent;
		}

		return {
			firstParagraph: firstParagraphText,
			remainingContent: remainingContent,
		};
	};

	const pageContent = processContent(article.pages[currentPage].content);

	return (
		<div
			className='min-h-screen flex flex-col bg-gray-100'
			dir={isRTL ? 'rtl' : 'ltr'}
			onTouchStart={swipeHandlers.onTouchStart}
			onTouchMove={swipeHandlers.onTouchMove}
			onTouchEnd={swipeHandlers.onTouchEnd}>
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

			<div className='flex-grow bg-white'>
				<div className='max-w-3xl mx-auto px-6 pt-12 pb-24'>
					<header className='mb-12 text-center'>
						<h2 className='text-3xl font-serif mb-8'>
							{article.pages[currentPage].title}
						</h2>
						<div className='border-b-2 border-black mb-8'></div>
					</header>
					<div className='prose prose-xl max-w-none pb-24'>
						{/* First paragraph with drop cap and preserved formatting */}
						{pageContent.firstParagraph && (
							<div
								className={`text-gray-800 leading-relaxed font-serif ql-editor first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] ${
									isRTL
										? 'first-letter:float-right first-letter:ml-3'
										: 'first-letter:float-left first-letter:mr-3'
								}`}
								dangerouslySetInnerHTML={createMarkup(
									pageContent.firstParagraph
								)}
							/>
						)}
						{/* Remaining content with preserved formatting */}
						{pageContent.remainingContent && (
							<div
								className='text-gray-800 leading-relaxed font-serif ql-editor'
								dangerouslySetInnerHTML={createMarkup(
									pageContent.remainingContent
								)}
							/>
						)}
					</div>
				</div>
			</div>

			<div className='fixed bottom-0 left-0 right-0 border-t bg-white'>
				<div className='w-full bg-gray-200 h-1'>
					<div
						className='bg-black h-1 transition-all duration-300'
						style={{ width: `${progress}%` }}
					/>
				</div>

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

				<div className='max-w-4xl mx-auto px-6 py-3'>
					<div className='flex items-center justify-between'>
						<button
							onClick={onBack}
							className='flex items-center text-gray-600 hover:text-black'>
							<Home
								className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`}
							/>
							{isRTL ? 'الرئيسية' : 'Home'}
						</button>

						<div className='flex items-center gap-4'>
							<button
								onClick={goToPreviousPage}
								disabled={currentPage === 0}
								className={`flex items-center px-4 py-2 border rounded font-serif ${
									currentPage === 0
										? 'text-gray-400 border-gray-200 cursor-not-allowed'
										: 'text-black border-gray-400 hover:bg-gray-50'
								}`}>
								{isRTL ? (
									<>
										<ArrowRight className='w-4 h-4 ml-2' />
										السابق
									</>
								) : (
									<>
										<ArrowLeft className='w-4 h-4 mr-2' />
										Previous
									</>
								)}
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
								{isRTL ? (
									<>
										التالي
										<ArrowLeft className='w-4 h-4 mr-2' />
									</>
								) : (
									<>
										Next
										<ArrowRight className='w-4 h-4 ml-2' />
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReaderPage;
