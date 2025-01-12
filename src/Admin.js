import React, { useState } from 'react';
import {
	Plus,
	Edit,
	Trash,
	Save,
	X,
	Users,
	Book,
	Layout,
	Download,
} from 'lucide-react';

import ArticlesData from './articles.data';
import AuthorsData from './authors.data';

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('articles');
	const [articles, setArticles] = useState(ArticlesData);
	const [authors, setAuthors] = useState(AuthorsData);
	const [editingArticle, setEditingArticle] = useState(null);
	const [editingAuthor, setEditingAuthor] = useState(null);
	const [showJson, setShowJson] = useState(false);

	// Article form state
	const [articleForm, setArticleForm] = useState({
		title: '',
		author: '',
		date: new Date().toISOString().split('T')[0],
		category: '',
		preview: '',
		featured: false,
		pages: [{ title: '', content: '' }],
	});

	// Author form state
	const [authorForm, setAuthorForm] = useState({
		name: '',
		bio: '',
		email: '',
	});

	const generateJson = () => {
		const data = {
			articles: articles.map((article) => ({
				...article,
				pages: article.pages.map((page) => ({
					title: page.title,
					content: page.content,
				})),
			})),
			authors: authors.map((author) => ({
				id: author.id,
				name: author.name,
				email: author.email,
				bio: author.bio,
			})),
		};
		return JSON.stringify(data, null, 2);
	};

	const downloadJson = () => {
		const jsonString = generateJson();
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'cms-data.json';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handleArticleSubmit = (e) => {
		e.preventDefault();
		if (editingArticle) {
			setArticles(
				articles.map((article) =>
					article.id === editingArticle.id
						? { ...articleForm, id: article.id }
						: article
				)
			);
		} else {
			setArticles([...articles, { ...articleForm, id: Date.now() }]);
		}
		setArticleForm({
			title: '',
			author: '',
			date: new Date().toISOString().split('T')[0],
			category: '',
			preview: '',
			featured: false,
			pages: [{ title: '', content: '' }],
		});
		setEditingArticle(null);
	};

	const handleAuthorSubmit = (e) => {
		e.preventDefault();
		if (editingAuthor) {
			setAuthors(
				authors.map((author) =>
					author.id === editingAuthor.id
						? { ...authorForm, id: author.id }
						: author
				)
			);
		} else {
			setAuthors([...authors, { ...authorForm, id: Date.now() }]);
		}
		setAuthorForm({
			name: '',
			bio: '',
			email: '',
		});
		setEditingAuthor(null);
	};

	const addPage = () => {
		setArticleForm({
			...articleForm,
			pages: [...articleForm.pages, { title: '', content: '' }],
		});
	};

	const removePage = (index) => {
		setArticleForm({
			...articleForm,
			pages: articleForm.pages.filter((_, i) => i !== index),
		});
	};

	const updatePage = (index, field, value) => {
		const newPages = [...articleForm.pages];
		newPages[index] = { ...newPages[index], [field]: value };
		setArticleForm({ ...articleForm, pages: newPages });
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			<header className='bg-white shadow'>
				<div className='max-w-7xl mx-auto px-4 py-6'>
					<h1 className='text-3xl font-bold text-gray-900'>
						Dashboard
					</h1>
				</div>
			</header>

			<main className='max-w-7xl mx-auto px-4 py-6'>
				<div className='flex justify-between items-center mb-6'>
					<div className='flex space-x-4'>
						<button
							onClick={() => setActiveTab('articles')}
							className={`flex items-center px-4 py-2 rounded-lg ${
								activeTab === 'articles'
									? 'bg-blue-500 text-white'
									: 'bg-white text-gray-700'
							}`}>
							<Book className='w-5 h-5 mr-2' />
							Articles
						</button>
						<button
							onClick={() => setActiveTab('authors')}
							className={`flex items-center px-4 py-2 rounded-lg ${
								activeTab === 'authors'
									? 'bg-blue-500 text-white'
									: 'bg-white text-gray-700'
							}`}>
							<Users className='w-5 h-5 mr-2' />
							Authors
						</button>
					</div>
					<div className='flex space-x-2'>
						<button
							onClick={() => setShowJson(!showJson)}
							className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'>
							<Layout className='w-5 h-5 mr-2' />
							{showJson ? 'Hide JSON' : 'Show JSON'}
						</button>
						<button
							onClick={downloadJson}
							className='flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'>
							<Download className='w-5 h-5 mr-2' />
							Download JSON
						</button>
					</div>
				</div>

				{showJson && (
					<div className='mb-6 bg-white rounded-lg shadow p-6'>
						<h3 className='text-lg font-medium mb-4'>
							JSON Preview
						</h3>
						<pre className='bg-gray-50 p-4 rounded-lg overflow-auto max-h-96'>
							{generateJson()}
						</pre>
					</div>
				)}

				{activeTab === 'articles' ? (
					<div className='bg-white rounded-lg shadow p-6'>
						<form
							onSubmit={handleArticleSubmit}
							className='space-y-6'>
							<div className='grid grid-cols-2 gap-6'>
								<div>
									<label className='block text-sm font-medium text-gray-700'>
										Title
									</label>
									<input
										type='text'
										value={articleForm.title}
										onChange={(e) =>
											setArticleForm({
												...articleForm,
												title: e.target.value,
											})
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700'>
										Author
									</label>
									<select
										value={articleForm.author}
										onChange={(e) =>
											setArticleForm({
												...articleForm,
												author: e.target.value,
											})
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
										<option value=''>
											Select an author
										</option>
										{authors.map((author) => (
											<option
												key={author.id}
												value={author.name}>
												{author.name}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-6'>
								<div>
									<label className='block text-sm font-medium text-gray-700'>
										Category
									</label>
									<input
										type='text'
										value={articleForm.category}
										onChange={(e) =>
											setArticleForm({
												...articleForm,
												category: e.target.value,
											})
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700'>
										Date
									</label>
									<input
										type='date'
										value={articleForm.date}
										onChange={(e) =>
											setArticleForm({
												...articleForm,
												date: e.target.value,
											})
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Preview
								</label>
								<textarea
									value={articleForm.preview}
									onChange={(e) =>
										setArticleForm({
											...articleForm,
											preview: e.target.value,
										})
									}
									rows={3}
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>

							<div className='flex items-center'>
								<input
									type='checkbox'
									checked={articleForm.featured}
									onChange={(e) =>
										setArticleForm({
											...articleForm,
											featured: e.target.checked,
										})
									}
									className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<label className='ml-2 block text-sm text-gray-900'>
									Featured Article
								</label>
							</div>

							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-medium'>
										Content Sections
									</h3>
									<button
										type='button'
										onClick={addPage}
										className='flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100'>
										<Plus className='w-4 h-4 mr-2' />
										Add Section
									</button>
								</div>

								{articleForm.pages.map((page, index) => (
									<div
										key={index}
										className='border rounded-lg p-4 space-y-4'>
										<div className='flex justify-between items-start'>
											<input
												type='text'
												value={page.title}
												onChange={(e) =>
													updatePage(
														index,
														'title',
														e.target.value
													)
												}
												placeholder='Section Title'
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
											/>
											{articleForm.pages.length > 1 && (
												<button
													type='button'
													onClick={() =>
														removePage(index)
													}
													className='ml-2 p-1 text-red-600 hover:bg-red-50 rounded'>
													<X className='w-5 h-5' />
												</button>
											)}
										</div>
										<textarea
											value={page.content}
											onChange={(e) =>
												updatePage(
													index,
													'content',
													e.target.value
												)
											}
											rows={6}
											placeholder='Section Content'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
										/>
									</div>
								))}
							</div>

							<div className='flex justify-end'>
								<button
									type='submit'
									className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
									<Save className='w-5 h-5 mr-2' />
									{editingArticle
										? 'Update Article'
										: 'Create Article'}
								</button>
							</div>
						</form>

						<div className='mt-8'>
							<h3 className='text-lg font-medium mb-4'>
								Published Articles
							</h3>
							<div className='space-y-4'>
								{articles.map((article) => (
									<div
										key={article.id}
										className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'>
										<div>
											<h4 className='font-medium'>
												{article.title}
											</h4>
											<p className='text-sm text-gray-500'>
												{article.author} •{' '}
												{article.date}
											</p>
										</div>
										<div className='flex space-x-2'>
											<button
												onClick={() => {
													setEditingArticle(article);
													setArticleForm(article);
												}}
												className='p-2 text-blue-600 hover:bg-blue-50 rounded'>
												<Edit className='w-5 h-5' />
											</button>
											<button
												onClick={() =>
													setArticles(
														articles.filter(
															(a) =>
																a.id !==
																article.id
														)
													)
												}
												className='p-2 text-red-600 hover:bg-red-50 rounded'>
												<Trash className='w-5 h-5' />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					<div className='bg-white rounded-lg shadow p-6'>
						<form
							onSubmit={handleAuthorSubmit}
							className='space-y-6'>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Name
								</label>
								<input
									type='text'
									value={authorForm.name}
									onChange={(e) =>
										setAuthorForm({
											...authorForm,
											name: e.target.value,
										})
									}
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Email
								</label>
								<input
									type='email'
									value={authorForm.email}
									onChange={(e) =>
										setAuthorForm({
											...authorForm,
											email: e.target.value,
										})
									}
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Bio
								</label>
								<textarea
									value={authorForm.bio}
									onChange={(e) =>
										setAuthorForm({
											...authorForm,
											bio: e.target.value,
										})
									}
									rows={3}
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>

							<div className='flex justify-end'>
								<button
									type='submit'
									className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
									<Save className='w-5 h-5 mr-2' />
									{editingAuthor
										? 'Update Author'
										: 'Add Author'}
								</button>
							</div>
						</form>

						<div className='mt-8'>
							<h3 className='text-lg font-medium mb-4'>
								Authors
							</h3>
							<div className='space-y-4'>
								{authors.map((author) => (
									<div
										key={author.id}
										className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'>
										<div>
											<h4 className='font-medium'>
												{author.name}
											</h4>
											<p className='text-sm text-gray-500'>
												{author.email}
											</p>
										</div>
										<div className='flex space-x-2'>
											<button
												onClick={() => {
													setEditingAuthor(author);
													setAuthorForm(author);
												}}
												className='p-2 text-blue-600 hover:bg-blue-50 rounded'>
												<Edit className='w-5 h-5' />
											</button>
											<button
												onClick={() =>
													setAuthors(
														authors.filter(
															(a) =>
																a.id !==
																author.id
														)
													)
												}
												className='p-2 text-red-600 hover:bg-red-50 rounded'>
												<Trash className='w-5 h-5' />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default AdminDashboard;
