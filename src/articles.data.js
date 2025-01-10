// Article data
const articles = [
	{
		id: 1,
		title: 'Understanding Modern Architecture',
		author: 'Jane Smith',
		date: 'January 1, 2025',
		category: 'Architecture',
		preview:
			'An exploration of contemporary architectural trends and their impact on urban development. This comprehensive analysis delves into the principles that shape our modern cityscapes.',
		featured: true,
		pages: [
			{
				title: 'The Evolution of Modern Design',
				content:
					"Modern architecture is characterized by its emphasis on function and simplicity. The movement began in the early 20th century and has continuously evolved, adapting to changing societal needs and technological capabilities. Today's architects are pushing boundaries further than ever before.",
			},
			{
				title: 'Materials and Innovation',
				content:
					'The use of new materials and technologies has revolutionized building design. From smart glass to self-healing concrete, these innovations are changing how we think about construction and sustainability. Each new material brings its own set of possibilities and challenges.',
			},
			{
				title: 'Sustainable Architecture',
				content:
					'Sustainability has become a core principle in contemporary architecture. Modern buildings are not just about aesthetics and function, but also about their environmental impact. Architects are increasingly incorporating green technologies and sustainable practices into their designs.',
			},
		],
	},
	{
		id: 2,
		title: 'The Future of Renewable Energy',
		author: 'John Doe',
		date: 'December 31, 2024',
		category: 'Science',
		preview:
			'Examining the latest developments in sustainable power generation and their potential impact on global energy markets. New breakthroughs promise to revolutionize how we power our world.',
		featured: false,
		pages: [
			{
				title: 'The Rise of Renewables',
				content:
					'Renewable energy sources are becoming increasingly important in our global energy mix. As technology improves and costs decrease, solar and wind power are becoming more competitive with traditional fossil fuels. This transition is reshaping our energy landscape.',
			},
			{
				title: 'Technological Breakthroughs',
				content:
					'Solar and wind power have seen dramatic improvements in efficiency. New manufacturing techniques and materials are making renewable energy more accessible than ever before. These advances are driving down costs and increasing adoption worldwide.',
			},
			{
				title: 'Storage Solutions',
				content:
					"Energy storage solutions are key to renewable energy adoption. Battery technology is advancing rapidly, making it possible to store and use renewable energy even when the sun isn't shining or the wind isn't blowing. This is solving one of the biggest challenges in renewable energy.",
			},
		],
	},
	{
		id: 3,
		title: 'The Future of Renewable Energy',
		author: 'John Doe',
		date: 'December 31, 2024',
		category: 'Science',
		preview:
			'Examining the latest developments in sustainable power generation and their potential impact on global energy markets. New breakthroughs promise to revolutionize how we power our world.',
		featured: false,
		pages: [
			{
				title: 'The Rise of Renewables',
				content:
					'Renewable energy sources are becoming increasingly important in our global energy mix. As technology improves and costs decrease, solar and wind power are becoming more competitive with traditional fossil fuels. This transition is reshaping our energy landscape.',
			},
			{
				title: 'Technological Breakthroughs',
				content:
					'Solar and wind power have seen dramatic improvements in efficiency. New manufacturing techniques and materials are making renewable energy more accessible than ever before. These advances are driving down costs and increasing adoption worldwide.',
			},
			{
				title: 'Storage Solutions',
				content:
					"Energy storage solutions are key to renewable energy adoption. Battery technology is advancing rapidly, making it possible to store and use renewable energy even when the sun isn't shining or the wind isn't blowing. This is solving one of the biggest challenges in renewable energy.",
			},
		],
	},
	{
		id: 4,
		title: 'The Future of Renewable Energy',
		author: 'John Doe',
		date: 'December 31, 2024',
		category: 'Science',
		preview:
			'Examining the latest developments in sustainable power generation and their potential impact on global energy markets. New breakthroughs promise to revolutionize how we power our world.',
		featured: false,
		pages: [
			{
				title: 'The Rise of Renewables',
				content:
					'Renewable energy sources are becoming increasingly important in our global energy mix. As technology improves and costs decrease, solar and wind power are becoming more competitive with traditional fossil fuels. This transition is reshaping our energy landscape.',
			},
			{
				title: 'Technological Breakthroughs',
				content:
					'Solar and wind power have seen dramatic improvements in efficiency. New manufacturing techniques and materials are making renewable energy more accessible than ever before. These advances are driving down costs and increasing adoption worldwide.',
			},
			{
				title: 'Storage Solutions',
				content:
					"Energy storage solutions are key to renewable energy adoption. Battery technology is advancing rapidly, making it possible to store and use renewable energy even when the sun isn't shining or the wind isn't blowing. This is solving one of the biggest challenges in renewable energy.",
			},
		],
	},
	{
		id: 5,
		title: 'The Future of Renewable Energy',
		author: 'John Doe',
		date: 'December 31, 2024',
		category: 'Science',
		preview:
			'Examining the latest developments in sustainable power generation and their potential impact on global energy markets. New breakthroughs promise to revolutionize how we power our world.',
		featured: false,
		pages: [
			{
				title: 'The Rise of Renewables',
				content:
					'Renewable energy sources are becoming increasingly important in our global energy mix. As technology improves and costs decrease, solar and wind power are becoming more competitive with traditional fossil fuels. This transition is reshaping our energy landscape.',
			},
			{
				title: 'Technological Breakthroughs',
				content:
					'Solar and wind power have seen dramatic improvements in efficiency. New manufacturing techniques and materials are making renewable energy more accessible than ever before. These advances are driving down costs and increasing adoption worldwide.',
			},
			{
				title: 'Storage Solutions',
				content:
					"Energy storage solutions are key to renewable energy adoption. Battery technology is advancing rapidly, making it possible to store and use renewable energy even when the sun isn't shining or the wind isn't blowing. This is solving one of the biggest challenges in renewable energy.",
			},
		],
	},

	{
		id: 6,
		title: 'مستقبل الطاقة المتجددة',
		author: 'أحمد محمد',
		date: '١ يناير ٢٠٢٥',
		category: 'العلوم',
		preview:
			'دراسة أحدث التطورات في توليد الطاقة المستدامة وتأثيرها المحتمل على أسواق الطاقة العالمية.',
		featured: false,
		pages: [
			{
				title: 'تطور الطاقة المتجددة',
				content:
					'أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.',
			},
			{
				title: 'تطور الطاقة المتجددة',
				content:
					'أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.أصبحت مصادر الطاقة المتجددة عنصراً متزايد الأهمية في مزيج الطاقة العالمي.',
			},
		],
	},
];

export default articles;
