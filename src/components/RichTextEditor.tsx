import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
    Image as ImageIcon, Code, Quote, Heading1, Heading2, Heading3,
    Eye, EyeOff, X, Palette
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
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

    const insertAtCursor = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
        onChange(newText);

        // Set cursor position after inserted text
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
        onChange(newText);

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

    const handleColorApply = (color: string) => {
        insertAtCursor(`<span style="color: ${color}">`, '</span>');
        setShowColorPicker(false);
    };

    const toolbarButtons = [
        { icon: Heading1, action: () => insertAtCursor('<h1>', '</h1>'), title: 'Heading 1' },
        { icon: Heading2, action: () => insertAtCursor('<h2>', '</h2>'), title: 'Heading 2' },
        { icon: Heading3, action: () => insertAtCursor('<h3>', '</h3>'), title: 'Heading 3' },
        { icon: Bold, action: () => insertAtCursor('<strong>', '</strong>'), title: 'Bold' },
        { icon: Italic, action: () => insertAtCursor('<em>', '</em>'), title: 'Italic' },
        { icon: Underline, action: () => insertAtCursor('<u>', '</u>'), title: 'Underline' },
        { icon: List, action: () => insertHtml('\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n'), title: 'Bullet List' },
        { icon: ListOrdered, action: () => insertHtml('\n<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ol>\n'), title: 'Numbered List' },
        { icon: Quote, action: () => insertAtCursor('<blockquote>', '</blockquote>'), title: 'Quote' },
        { icon: Code, action: () => insertAtCursor('<code>', '</code>'), title: 'Inline Code' },
        { icon: Palette, action: () => setShowColorPicker(true), title: 'Text Color' },
        { icon: LinkIcon, action: () => setShowLinkModal(true), title: 'Insert Link' },
        { icon: ImageIcon, action: () => setShowImageModal(true), title: 'Insert Image' },
    ];

    return (
        <div className="relative">
            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 rounded-t-lg p-2 flex flex-wrap gap-1">
                {toolbarButtons.map((button, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={button.action}
                        title={button.title}
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                    >
                        <button.icon className="w-4 h-4 text-gray-300" />
                    </button>
                ))}

                <div className="ml-auto flex gap-1">
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
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder || "Write your content here...\n\nYou can use HTML tags for formatting.\nUse the toolbar above to insert images, links, and formatted content."}
                        className="w-full min-h-[500px] p-4 bg-white/5 border border-white/10 border-t-0 rounded-b-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-y"
                    />
                ) : (
                    <div className="w-full min-h-[500px] p-4 bg-white/5 border border-white/10 border-t-0 rounded-b-lg overflow-auto">
                        <div
                            className="prose prose-invert prose-lg max-w-none
                                prose-headings:text-white prose-headings:font-bold
                                prose-h1:text-4xl prose-h1:mb-6
                                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
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
                                [&_figcaption]:text-gray-400 [&_figcaption]:mt-2 [&_figcaption]:italic"
                            dangerouslySetInnerHTML={{ __html: value }}
                        />
                    </div>
                )}
            </div>

            {/* Helper Text */}
            <div className="mt-2 text-xs text-gray-400">
                <div className="flex flex-wrap gap-4">
                    <span>💡 Tip: Use the toolbar buttons to format your content</span>
                    <span>📝 Word Count: {(value || '').split(/\s+/).filter(word => word.length > 0).length}</span>
                </div>
            </div>

            {/* Image Insert Modal */}
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
                                <button
                                    onClick={() => setShowImageModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Image URL *
                                    </label>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Alt Text (for accessibility)
                                    </label>
                                    <input
                                        type="text"
                                        value={imageAlt}
                                        onChange={(e) => setImageAlt(e.target.value)}
                                        placeholder="Description of the image"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Caption (optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={imageCaption}
                                        onChange={(e) => setImageCaption(e.target.value)}
                                        placeholder="Image caption"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {imageUrl && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Preview
                                        </label>
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

            {/* Link Insert Modal */}
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
                                <button
                                    onClick={() => setShowLinkModal(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        URL *
                                    </label>
                                    <input
                                        type="url"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Link Text
                                    </label>
                                    <input
                                        type="text"
                                        value={linkText}
                                        onChange={(e) => setLinkText(e.target.value)}
                                        placeholder="Click here (optional - will use URL if empty)"
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
                                <button
                                    onClick={() => setShowColorPicker(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Preset Colors */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Preset Colors
                                    </label>
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

                                {/* Custom Color */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Custom Color
                                    </label>
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
        </div>
    );
};

export default RichTextEditor;
