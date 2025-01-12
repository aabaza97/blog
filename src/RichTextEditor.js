import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote } from 'lucide-react';

const MenuBar = ({ editor }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className='border-b p-2 mb-2 flex gap-2'>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`p-1 rounded ${
					editor.isActive('bold') ? 'bg-gray-200' : ''
				}`}>
				<Bold className='w-5 h-5' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`p-1 rounded ${
					editor.isActive('italic') ? 'bg-gray-200' : ''
				}`}>
				<Italic className='w-5 h-5' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`p-1 rounded ${
					editor.isActive('bulletList') ? 'bg-gray-200' : ''
				}`}>
				<List className='w-5 h-5' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={`p-1 rounded ${
					editor.isActive('orderedList') ? 'bg-gray-200' : ''
				}`}>
				<ListOrdered className='w-5 h-5' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={`p-1 rounded ${
					editor.isActive('blockquote') ? 'bg-gray-200' : ''
				}`}>
				<Quote className='w-5 h-5' />
			</button>
		</div>
	);
};

const RichTextEditor = ({ content, onChange, placeholder }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: 'prose max-w-none focus:outline-none min-h-[200px]',
			},
		},
	});

	return (
		<div className='border rounded-md'>
			<MenuBar editor={editor} />
			<div className='p-2'>
				<EditorContent editor={editor} placeholder={placeholder} />
			</div>
		</div>
	);
};

export default RichTextEditor;
