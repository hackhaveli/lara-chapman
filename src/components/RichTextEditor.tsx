import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link as LinkIcon,
    Image as ImageIcon, Code, Quote, Heading1, Heading2, Heading3,
    Eye, EyeOff, X, Palette, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Minus, Table, RotateCcw, RotateCw, Eraser, Highlighter, Type,
    Heading4, Heading5, Heading6, Superscript, Subscript, FileCode
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showTableModal, setShowTableModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [selectedBgColor, setSelectedBgColor] = useState('#ffff00');
    const [tableRows, setTableRows] = useState(3);
    const [tableCols, setTableCols] = useState(3);
    const [history, setHistory] = useState<string[]>([value]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const colorPresets = [
        { name: 'White', color: '#FFFFFF' },
        { name: 'Black', color: '#000000' },
        { name: 'Red', color: '#EF4444' },
        { name: 'Orange', color: '#F97316' },
        { name: 'Yellow', color: '#EAB308' },
        { name: 'Green', color: '#22C55E' },
        { name: 'Blue', color: '#3B82F6' },
        { name: 'Purple', color: '#A855F7' },
        { name: 'Pink', color: '#EC4899' },
        { name: 'Gray', color: '#9CA3AF' },
    ];

    const bgColorPresets = [
        { name: 'Yellow', color: '#FEF08A' },
        { name: 'Green', color: '#BBF7D0' },
        { name: 'Blue', color: '#BFDBFE' },
        { name: 'Purple', color: '#E9D5FF' },
        { name: 'Pink', color: '#FBCFE8' },
        { name: 'Orange', color: '#FED7AA' },
        { name: 'Red', color: '#FECACA' },
        { name: 'Gray', color: '#E5E7EB' },
    ];

    const addToHistory = (newValue: string) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newValue);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        onChange(newValue);
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            onChange(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            onChange(history[historyIndex + 1]);
        }
    };

    const insertAtCursor = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
        addToHistory(newText);

        setTimeout(() => {
            textarea.focus();
            const newPosition = start + before.length + selectedText.length;
            textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
    };

    const insertHtml = (html: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const text = value;
        const newText = text.substring(0, start) + html + text.substring(start);
        addToHistory(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + html.length, start + html.length);
        }, 0);
    };

    const handleImageInsert = () => {
        if (!imageUrl) return;

        let html = `\n<figure class="blog-image">\n  <img src="${imageUrl}" alt="${imageAlt || 'Blog image'}" />\n`;
        if (imageCaption) {
            html += `  <figcaption>${imageCaption}</figcaption>\n`;
        }
        html += `</figure>\n\n`;

        insertHtml(html);
        setShowImageModal(false);
        setImageUrl('');
        setImageAlt('');
        setImageCaption('');
    };

    const handleLinkInsert = () => {
        if (!linkUrl) return;

        const text = linkText || linkUrl;
        const html = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        insertHtml(html);
        setShowLinkModal(false);
        setLinkUrl('');
        setLinkText('');
    };

    const handleTableInsert = () => {
        let html = '\n<table class="blog-table">\n';

        // Table header
        html += '  <thead>\n    <tr>\n';
        for (let i = 0; i < tableCols; i++) {
            html += `      <th>Header ${i + 1}</th>\n`;
        }
        html += '    </tr>\n  </thead>\n';

        // Table body
        html += '  <tbody>\n';
        for (let i = 0; i < tableRows; i++) {
            html += '    <tr>\n';
            for (let j = 0; j < tableCols; j++) {
                html += `      <td>Cell ${i + 1},${j + 1}</td>\n`;
            }
            html += '    </tr>\n';
        }
        html += '  </tbody>\n</table>\n\n';

        insertHtml(html);
        setShowTableModal(false);
        setTableRows(3);
        setTableCols(3);
    };

    const handleColorApply = (color: string) => {
        insertAtCursor(`<span style="color: ${color}">`, '</span>');
        setShowColorPicker(false);
    };

    const handleBgColorApply = (color: string) => {
        insertAtCursor(`<mark style="background-color: ${color}">`, '</mark>');
        setShowBgColorPicker(false);
    };

    const toolbarSections = [
        {
            name: 'History',
            buttons: [
                { icon: RotateCcw, action: undo, title: 'Undo', disabled: historyIndex === 0 },
                { icon: RotateCw, action: redo, title: 'Redo', disabled: historyIndex === history.length - 1 },
            ]
        },
        {
            name: 'Headings',
            buttons: [
                { icon: Heading1, action: () => insertAtCursor('<h1>', '</h1>'), title: 'Heading 1' },
                { icon: Heading2, action: () => insertAtCursor('<h2>', '</h2>'), title: 'Heading 2' },
                { icon: Heading3, action: () => insertAtCursor('<h3>', '</h3>'), title: 'Heading 3' },
                { icon: Heading4, action: () => insertAtCursor('<h4>', '</h4>'), title: 'Heading 4' },
                { icon: Heading5, action: () => insertAtCursor('<h5>', '</h5>'), title: 'Heading 5' },
                { icon: Heading6, action: () => insertAtCursor('<h6>', '</h6>'), title: 'Heading 6' },
            ]
        },
        {
            name: 'Text Format',
            buttons: [
                { icon: Bold, action: () => insertAtCursor('<strong>', '</strong>'), title: 'Bold' },
                { icon: Italic, action: () => insertAtCursor('<em>', '</em>'), title: 'Italic' },
                { icon: Underline, action: () => insertAtCursor('<u>', '</u>'), title: 'Underline' },
                { icon: Strikethrough, action: () => insertAtCursor('<s>', '</s>'), title: 'Strikethrough' },
                { icon: Superscript, action: () => insertAtCursor('<sup>', '</sup>'), title: 'Superscript' },
                { icon: Subscript, action: () => insertAtCursor('<sub>', '</sub>'), title: 'Subscript' },
            ]
        },
        {
            name: 'Alignment',
            buttons: [
                { icon: AlignLeft, action: () => insertAtCursor('<div style="text-align: left">', '</div>'), title: 'Align Left' },
                { icon: AlignCenter, action: () => insertAtCursor('<div style="text-align: center">', '</div>'), title: 'Align Center' },
                { icon: AlignRight, action: () => insertAtCursor('<div style="text-align: right">', '</div>'), title: 'Align Right' },
                { icon: AlignJustify, action: () => insertAtCursor('<div style="text-align: justify">', '</div>'), title: 'Justify' },
            ]
        },
        {
            name: 'Lists & Quotes',
            buttons: [
                { icon: List, action: () => insertHtml('\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n'), title: 'Bullet List' },
                { icon: ListOrdered, action: () => insertHtml('\n<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ol>\n'), title: 'Numbered List' },
                { icon: Quote, action: () => insertAtCursor('<blockquote>', '</blockquote>'), title: 'Quote' },
            ]
        },
        {
            name: 'Code',
            buttons: [
                { icon: Code, action: () => insertAtCursor('<code>', '</code>'), title: 'Inline Code' },
                { icon: FileCode, action: () => insertHtml('\n<pre><code>\n// Your code here\n</code></pre>\n'), title: 'Code Block' },
            ]
        },
        {
            name: 'Colors',
            buttons: [
                { icon: Palette, action: () => setShowColorPicker(true), title: 'Text Color' },
                { icon: Highlighter, action: () => setShowBgColorPicker(true), title: 'Highlight' },
            ]
        },
        {
            name: 'Insert',
            buttons: [
                { icon: LinkIcon, action: () => setShowLinkModal(true), title: 'Insert Link' },
                { icon: ImageIcon, action: () => setShowImageModal(true), title: 'Insert Image' },
                { icon: Table, action: () => setShowTableModal(true), title: 'Insert Table' },
                { icon: Minus, action: () => insertHtml('\n<hr />\n'), title: 'Horizontal Rule' },
            ]
        },
    ];

    const wordCount = (value || '').split(/\s+/).filter(word => word.length > 0).length;
    const charCount = (value || '').length;
    const readTime = Math.ceil(wordCount / 200);

    return (
        <div className="relative">
            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 rounded-t-lg p-3">
                {toolbarSections.map((section, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1 mr-3 mb-2">
                        {section.buttons.map((button, btnIdx) => (
                            <button
                                key={btnIdx}
                                type="button"
                                onClick={button.action}
                                disabled={button.disabled}
                                title={button.title}
                                className={`p-2 rounded transition-colors ${button.disabled
                                        ? 'opacity-30 cursor-not-allowed'
                                        : 'hover:bg-white/10'
                                    }`}
                            >
                                <button.icon className="w-4 h-4 text-gray-300" />
                            </button>
                        ))}
                        {idx < toolbarSections.length - 1 && (
                            <div className="w-px h-6 bg-white/10 ml-1" />
                        )}
                    </div>
                ))}

                <div className="inline-flex items-center gap-2 float-right">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded transition-colors"
                        title={showPreview ? 'Hide Preview' : 'Show Preview'}
                    >
                        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span className="text-sm">{showPreview ? 'Edit' : 'Preview'}</span>
                    </button>
                </div>
            </div>

            {/* Editor / Preview */}
            <div className="relative">
                {!showPreview ? (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            if (e.target.value !== history[historyIndex]) {
                                addToHistory(e.target.value);
                            }
                        }}
                        placeholder={placeholder || "Write your content here...\n\nYou can use HTML tags for formatting.\nUse the toolbar above to insert images, links, tables, and formatted content."}
                        className="w-full min-h-[500px] p-4 bg-white/5 border border-white/10 border-t-0 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-y"
                    />
                ) : (
                    <div className="w-full min-h-[500px] p-4 bg-white/5 border border-white/10 border-t-0 overflow-auto">
                        <div
                            className="prose prose-invert prose-lg max-w-none
                                prose-headings:text-white prose-headings:font-bold
                                prose-h1:text-4xl prose-h1:mb-6
                                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                                prose-h4:text-xl prose-h4:mt-5 prose-h4:mb-2
                                prose-h5:text-lg prose-h5:mt-4 prose-h5:mb-2
                                prose-h6:text-base prose-h6:mt-3 prose-h6:mb-2
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                                prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                                prose-strong:text-white prose-strong:font-semibold
                                prose-ul:text-gray-300 prose-ul:my-4
                                prose-ol:text-gray-300 prose-ol:my-4
                                prose-li:my-1
                                prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-6
                                prose-blockquote:border-l-4 prose-blockquote:border-purple-600 
                                prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6
                                prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                                prose-code:text-purple-300 prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                                prose-pre:bg-gray-800 prose-pre:border prose-pre:border-white/10
                                [&_figure]:my-8 [&_figcaption]:text-center [&_figcaption]:text-sm 
                                [&_figcaption]:text-gray-400 [&_figcaption]:mt-2 [&_figcaption]:italic
                                [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                                [&_th]:bg-purple-600/20 [&_th]:border [&_th]:border-white/10 [&_th]:p-3 [&_th]:text-left
                                [&_td]:border [&_td]:border-white/10 [&_td]:p-3
                                [&_hr]:border-white/20 [&_hr]:my-8
                                [&_mark]:bg-yellow-500/30 [&_mark]:px-1 [&_mark]:rounded"
                            dangerouslySetInnerHTML={{ __html: value }}
                        />
                    </div>
                )}
            </div>

            {/* Stats Bar */}
            <div className="bg-white/5 border border-white/10 border-t-0 rounded-b-lg p-2 text-xs text-gray-400">
                <div className="flex flex-wrap gap-4">
                    <span>📝 Words: {wordCount}</span>
                    <span>🔤 Characters: {charCount}</span>
                    <span>⏱️ Read Time: ~{readTime} min</span>
                    <span className="ml-auto">💡 Tip: Use Ctrl+Z to undo, Ctrl+Y to redo</span>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {showImageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowImageModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Insert Image</h3>
                                <button onClick={() => setShowImageModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL *</label>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Alt Text</label>
                                    <input
                                        type="text"
                                        value={imageAlt}
                                        onChange={(e) => setImageAlt(e.target.value)}
                                        placeholder="Description for accessibility"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Caption</label>
                                    <input
                                        type="text"
                                        value={imageCaption}
                                        onChange={(e) => setImageCaption(e.target.value)}
                                        placeholder="Optional caption"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {imageUrl && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EInvalid Image URL%3C/text%3E%3C/svg%3E';
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleImageInsert}
                                        disabled={!imageUrl}
                                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                                    >
                                        Insert Image
                                    </button>
                                    <button
                                        onClick={() => setShowImageModal(false)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Link Modal */}
            <AnimatePresence>
                {showLinkModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowLinkModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Insert Link</h3>
                                <button onClick={() => setShowLinkModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">URL *</label>
                                    <input
                                        type="url"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Link Text</label>
                                    <input
                                        type="text"
                                        value={linkText}
                                        onChange={(e) => setLinkText(e.target.value)}
                                        placeholder="Click here (optional)"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleLinkInsert}
                                        disabled={!linkUrl}
                                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                                    >
                                        Insert Link
                                    </button>
                                    <button
                                        onClick={() => setShowLinkModal(false)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table Modal */}
            <AnimatePresence>
                {showTableModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowTableModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Insert Table</h3>
                                <button onClick={() => setShowTableModal(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Rows: {tableRows}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={tableRows}
                                        onChange={(e) => setTableRows(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Columns: {tableCols}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="8"
                                        value={tableCols}
                                        onChange={(e) => setTableCols(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleTableInsert}
                                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                    >
                                        Insert Table
                                    </button>
                                    <button
                                        onClick={() => setShowTableModal(false)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Color Picker Modal */}
            <AnimatePresence>
                {showColorPicker && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowColorPicker(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Text Color</h3>
                                <button onClick={() => setShowColorPicker(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">Preset Colors</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {colorPresets.map((preset) => (
                                            <button
                                                key={preset.color}
                                                onClick={() => handleColorApply(preset.color)}
                                                className="group relative"
                                                title={preset.name}
                                            >
                                                <div
                                                    className="w-full aspect-square rounded-lg border-2 border-white/20 hover:border-purple-500 hover:scale-110 transition-all cursor-pointer"
                                                    style={{ backgroundColor: preset.color }}
                                                />
                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {preset.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Custom Color</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            className="w-16 h-10 rounded cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            placeholder="#FFFFFF"
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <button
                                            onClick={() => handleColorApply(selectedColor)}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowColorPicker(false)}
                                    className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Color Picker Modal */}
            <AnimatePresence>
                {showBgColorPicker && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowBgColorPicker(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">Highlight Color</h3>
                                <button onClick={() => setShowBgColorPicker(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">Preset Highlights</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {bgColorPresets.map((preset) => (
                                            <button
                                                key={preset.color}
                                                onClick={() => handleBgColorApply(preset.color)}
                                                className="group relative"
                                                title={preset.name}
                                            >
                                                <div
                                                    className="w-full aspect-square rounded-lg border-2 border-white/20 hover:border-purple-500 hover:scale-110 transition-all cursor-pointer"
                                                    style={{ backgroundColor: preset.color }}
                                                />
                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {preset.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Custom Highlight</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="color"
                                            value={selectedBgColor}
                                            onChange={(e) => setSelectedBgColor(e.target.value)}
                                            className="w-16 h-10 rounded cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={selectedBgColor}
                                            onChange={(e) => setSelectedBgColor(e.target.value)}
                                            placeholder="#FFFF00"
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <button
                                            onClick={() => handleBgColorApply(selectedBgColor)}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowBgColorPicker(false)}
                                    className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RichTextEditor;
