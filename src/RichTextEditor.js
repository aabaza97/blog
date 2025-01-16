import React, { useEffect, useRef, forwardRef, useLayoutEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = forwardRef(
	(
		{
			readOnly,
			value,
			onTextChange,
			onSelectionChange,
			height,
			placeholder,
		},
		ref
	) => {
		const containerRef = useRef(null);
		const onTextChangeRef = useRef(onTextChange);
		const onSelectionChangeRef = useRef(onSelectionChange);
		const valueRef = useRef(value);
		const toolbarOptions = [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ header: 1 }, { header: 2 }],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }],
			[{ indent: '-1' }, { indent: '+1' }],
			[{ direction: 'rtl' }],
			[{ size: ['small', false, 'large', 'huge'] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ color: [] }, { background: [] }],
			[{ font: [] }],
			[{ align: [] }],
			['clean'],
			['link', 'image'],
		];

		useLayoutEffect(() => {
			onTextChangeRef.current = onTextChange;
			onSelectionChangeRef.current = onSelectionChange;
			valueRef.current = value;
		});

		useEffect(() => {
			ref.current?.enable(!readOnly);
		}, [ref, readOnly]);

		useEffect(() => {
			const container = containerRef.current;
			const editorContainer = container.appendChild(
				container.ownerDocument.createElement('div')
			);

			// Set the height on the editor container
			editorContainer.style.height = height || '300px';

			const quill = new Quill(editorContainer, {
				modules: {
					toolbar: toolbarOptions,
				},
				placeholder: placeholder || 'Write something...',
				theme: 'snow',
			});

			ref.current = quill;

			// Set initial content
			if (valueRef.current) {
				quill.root.innerHTML = valueRef.current;
			}

			quill.on(Quill.events.TEXT_CHANGE, (delta, oldContents, source) => {
				if (source === 'user') {
					const html = quill.root.innerHTML;
					onTextChangeRef.current?.(html);
				}
			});

			quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
				onSelectionChangeRef.current?.(...args);
			});

			return () => {
				ref.current = null;
				container.innerHTML = '';
			};
		}, [ref]);

		// Handle updates from parent
		useEffect(() => {
			console.log('did trigger with value ', value);
			if (
				ref.current &&
				value !== undefined &&
				value !== ref.current.root.innerHTML
			) {
				ref.current.root.innerHTML = value;
			}
		}, [value]);

		return <div ref={containerRef} className='quill-container'></div>;
	}
);

const QuillEditor = ({
	value,
	onChange,
	placeholder = 'Write something...',
}) => {
	const quillRef = useRef(null);

	return (
		<div className='quill-editor-container'>
			<Editor
				value={value}
				ref={quillRef}
				onTextChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default QuillEditor;
