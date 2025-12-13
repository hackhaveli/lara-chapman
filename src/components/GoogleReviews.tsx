import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const GoogleReviews = () => {
  useEffect(() => {
    // Load Google Reviews script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">What My Clients Say</h2>
          <div className="flex justify-center items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-[#E76F51] fill-current" />
            ))}
          </div>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            Don't just take my word for it - hear what my clients have to say about working with me.
          </p>
        </div>

        {/* Google Reviews Widget */}
        <div className="elfsight-app-12345678-1111-2222-3333-1234567890ab"></div>
        
        {/* Note: You'll need to replace the above div with your actual Google Reviews widget ID after setting it up */}
        
        <div className="mt-12 text-center">
          <a
            href="https://g.page/r/your-google-business-page/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E76F51] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default GoogleReviews;
