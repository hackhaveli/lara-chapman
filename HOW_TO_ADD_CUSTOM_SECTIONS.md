# How to Add Custom Sections to Pages

This guide will teach you how to add new custom sections to any page on your website and make them fully editable from the Admin Panel.

## Table of Contents
1. [Quick Overview](#quick-overview)
2. [Step-by-Step Process](#step-by-step-process)
3. [Example: Adding "Awards & Recognition" Section](#example-adding-awards--recognition-section)
4. [Common Section Types](#common-section-types)
5. [Admin Panel Integration](#admin-panel-integration)

---

## Quick Overview

To add a custom section, you need to:
1. **Update the Content Model** (Backend) - Define the data structure
2. **Add Admin Panel Fields** (Frontend Admin) - Allow editing
3. **Add Section to Page** (Frontend Page) - Display the content

---

## Step-by-Step Process

### Step 1: Update Content Model (Backend)

**File:** `server/models/Content.js` or equivalent schema file

Add your new section fields to the appropriate page schema:

```javascript
// Example: Adding to "about" page
about: {
    // Existing fields...
    pageTitle: String,
    pageSubtitle: String,
    
    // NEW SECTION: Awards & Recognition
    awardsTitle: {
        type: String,
        default: "Awards & Recognition"
    },
    awardsSubtitle: {
        type: String,
        default: "Industry recognition and achievements"
    },
    awards: [{
        title: String,
        year: String,
        organization: String,
        description: String,
        icon: String
    }]
}
```

### Step 2: Add Admin Panel Fields (Frontend)

**File:** `src/pages/admin/AdminGeneral.tsx`

Find the tab for the page you're editing and add form fields:

```tsx
{/* Awards & Recognition Section */}
<div className="space-y-6">
    <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Awards & Recognition
        </h3>
    </div>
    
    {/* Section Title */}
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
            Section Title
        </label>
        <input
            type="text"
            value={aboutContent.awardsTitle || ''}
            onChange={(e) => setAboutContent(prev => ({
                ...prev,
                awardsTitle: e.target.value
            }))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
            placeholder="Awards & Recognition"
        />
    </div>
    
    {/* Section Subtitle */}
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
            Section Subtitle
        </label>
        <input
            type="text"
            value={aboutContent.awardsSubtitle || ''}
            onChange={(e) => setAboutContent(prev => ({
                ...prev,
                awardsSubtitle: e.target.value
            }))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
            placeholder="Industry recognition and achievements"
        />
    </div>
    
    {/* Awards List */}
    <div>
        <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-700">
                Awards
            </label>
            <button
                type="button"
                onClick={() => {
                    setAboutContent(prev => ({
                        ...prev,
                        awards: [
                            ...(prev.awards || []),
                            {
                                title: '',
                                year: '',
                                organization: '',
                                description: '',
                                icon: 'Award'
                            }
                        ]
                    }));
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#E76F51] text-white rounded-lg hover:bg-[#E76F51]/90"
            >
                <Plus size={16} />
                Add Award
            </button>
        </div>
        
        {aboutContent.awards?.map((award, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg mb-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Award Title
                        </label>
                        <input
                            type="text"
                            value={award.title}
                            onChange={(e) => {
                                const newAwards = [...(aboutContent.awards || [])];
                                newAwards[index] = { ...award, title: e.target.value };
                                setAboutContent(prev => ({ ...prev, awards: newAwards }));
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Year
                        </label>
                        <input
                            type="text"
                            value={award.year}
                            onChange={(e) => {
                                const newAwards = [...(aboutContent.awards || [])];
                                newAwards[index] = { ...award, year: e.target.value };
                                setAboutContent(prev => ({ ...prev, awards: newAwards }));
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                        />
                    </div>
                    
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Organization
                        </label>
                        <input
                            type="text"
                            value={award.organization}
                            onChange={(e) => {
                                const newAwards = [...(aboutContent.awards || [])];
                                newAwards[index] = { ...award, organization: e.target.value };
                                setAboutContent(prev => ({ ...prev, awards: newAwards }));
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                        />
                    </div>
                    
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Description
                        </label>
                        <textarea
                            value={award.description}
                            onChange={(e) => {
                                const newAwards = [...(aboutContent.awards || [])];
                                newAwards[index] = { ...award, description: e.target.value };
                                setAboutContent(prev => ({ ...prev, awards: newAwards }));
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                        />
                    </div>
                </div>
                
                <button
                    type="button"
                    onClick={() => {
                        const newAwards = aboutContent.awards?.filter((_, i) => i !== index);
                        setAboutContent(prev => ({ ...prev, awards: newAwards }));
                    }}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                >
                    <Trash2 size={14} />
                    Remove Award
                </button>
            </div>
        ))}
    </div>
</div>
```

### Step 3: Display Section on Page (Frontend)

**File:** `src/pages/About.tsx` (or whichever page you're adding to)

Add the section to your page component:

```tsx
// Inside your About component

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

// ...existing code...

{/* Awards & Recognition Section */}
{content?.about?.awards && content.about.awards.length > 0 && (
    <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 px-6 bg-gray-50"
    >
        <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[#333333] mb-4 font-serif">
                    {content.about.awardsTitle || 'Awards & Recognition'}
                </h2>
                <p className="text-xl text-[#555555] max-w-2xl mx-auto">
                    {content.about.awardsSubtitle || 'Industry recognition and achievements'}
                </p>
            </div>
            
            {/* Awards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.about.awards.map((award, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                    >
                        <div className="bg-[#2A9D8F]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <Award size={32} className="text-[#2A9D8F]" />
                        </div>
                        
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-[#E76F51]/10 text-[#E76F51] text-sm font-semibold rounded-full">
                                {award.year}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#333333] mb-3">
                            {award.title}
                        </h3>
                        
                        <p className="text-[#2A9D8F] font-semibold mb-3">
                            {award.organization}
                        </p>
                        
                        <p className="text-[#555555] leading-relaxed">
                            {award.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.section>
)}
```

---

## Common Section Types

### 1. Simple Text Section
**Use for:** Simple announcements, disclaimers

```javascript
// Schema
sectionTitle: String,
sectionText: String
```

### 2. Card Grid Section
**Use for:** Features, services, benefits

```javascript
// Schema
sectionTitle: String,
sectionSubtitle: String,
cards: [{
    title: String,
    description: String,
    icon: String
}]
```

### 3. CTA (Call-to-Action) Section
**Use for:** Contact prompts, download buttons

```javascript
// Schema
ctaTitle: String,
ctaText: String,
ctaButtonText: String,
ctaButtonUrl: String,
ctaBackgroundColor: String
```

### 4. Image + Text Section
**Use for:** About sections, explanations

```javascript
// Schema
sectionTitle: String,
sectionText: String,
sectionImage: String,
imagePosition: { type: String, enum: ['left', 'right'] }
```

### 5. FAQ Section
**Use for:** Frequently asked questions

```javascript
// Schema
faqTitle: String,
faqSubtitle: String,
faqs: [{
    question: String,
    answer: String
}]
```

### 6. Timeline Section
**Use for:** Process steps, history

```javascript
// Schema
timelineTitle: String,
timeline: [{
    step: String,
    title: String,
    description: String,
    image: String
}]
```

### 7. Testimonial Section
**Use for:** Client reviews

```javascript
// Schema  
testimonialsTitle: String,
testimonials: [{
    name: String,
    role: String,
    company: String,
    text: String,
    image: String,
    rating: Number
}]
```

---

## Admin Panel Integration

### State Management Pattern

Always use this pattern in `AdminGeneral.tsx`:

```tsx
// 1. Initialize state with the page content
const [pageContent, setPageContent] = useState({
    // existing fields...
    newField: ''
});

// 2. Handle input changes immutably
const handleChange = (field, value) => {
    setPageContent(prev => ({
        ...prev,
        [field]: value
    }));
};

// 3. For arrays (like awards, faqs), use this pattern:
const addItem = () => {
    setPageContent(prev => ({
        ...prev,
        items: [...(prev.items || []), { /* new item */ }]
    }));
};

const updateItem = (index, field, value) => {
    const newItems = [...pageContent.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setPageContent(prev => ({ ...prev, items: newItems }));
};

const removeItem = (index) => {
    setPageContent(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
    }));
};
```

### Save Function

Make sure your save function includes the new section:

```tsx
const handleSave = async () => {
    try {
        const response = await updateContentSection('about', {
            ...aboutContent,
            awards: aboutContent.awards // include new section
        });
        
        if (response.success) {
            showNotification('success', 'Saved successfully!');
        }
    } catch (error) {
        showNotification('error', 'Failed to save');
    }
};
```

---

## Full Example: Community Involvement Section

### 1. Backend Schema (`server/models/Content.js`):

```javascript
communityInvolvementTitle: {
    type: String,
    default: "Community Involvement"
},
communityInvolvementText: {
    type: String,
    default: "Giving back to the community we serve"
},
communityActivities: [{
    organization: String,
    role: String,
    description: String,
    logo: String,
    website: String
}]
```

### 2. Admin Panel (`src/pages/admin/AdminGeneral.tsx`):

```tsx
{/* Community Involvement */}
<div>
    <h3 className="text-lg font-semibold mb-4">Community Involvement</h3>
    
    <input
        type="text"
        value={content.communityInvolvementTitle || ''}
        onChange={(e) => updateContent('communityInvolvementTitle', e.target.value)}
        placeholder="Section Title"
        className="w-full px-4 py-3 mb-3 border rounded-xl"
    />
    
    <textarea
        value={content.communityInvolvementText || ''}
        onChange={(e) => updateContent('communityInvolvementText', e.target.value)}
        placeholder="Section Text"
        rows={3}
        className="w-full px-4 py-3 mb-4 border rounded-xl"
    />
    
    <button
        onClick={() => addCommunityActivity()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
        Add Activity
    </button>
    
    {content.communityActivities?.map((activity, idx) => (
        <div key={idx} className="p-4 border rounded-lg mb-3">
            {/* Activity form fields */}
        </div>
    ))}
</div>
```

### 3. Frontend Display (`src/pages/About.tsx`):

```tsx
{content?.communityActivities && (
    <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4">
                {content.communityInvolvementTitle}
            </h2>
            <p className="text-xl text-center mb-12">
                {content.communityInvolvementText}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
                {content.communityActivities.map((activity, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            {activity.organization}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-3">
                            {activity.role}
                        </p>
                        <p className="text-gray-600">
                            {activity.description}
                        </p>
                        {activity.website && (
                            <a 
                                href={activity.website}
                                className="text-blue-600 mt-3 inline-block"
                            >
                                Learn More →
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
)}
```

---

## Quick Checklist

When adding a new section, make sure you've completed:

- [ ] Added fields to backend Content schema
- [ ] Added form fields to appropriate Admin tab
- [ ] Created state management for the section
- [ ] Added section to the page component
- [ ] Tested saving in admin panel
- [ ] Tested display on public page
- [ ] Checked mobile responsiveness
- [ ] Added default/placeholder content

---

## Need Help?

If you need to add a specific section and want me to implement it for you:

1. Tell me which page (Home, About, Buy, Sell, etc.)
2. Describe the section (title, what content it should have)
3. Share any design preferences
4. I'll implement the full backend + admin + frontend for you!

---

**Pro Tip:** Always start with simple sections and gradually make them more complex. Test each piece as you go!
