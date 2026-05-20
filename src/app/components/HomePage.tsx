import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { TourCard } from './TourCard';
import { Award, Shield, HeadphonesIcon, Sparkles, Star, Quote } from 'lucide-react';
import api from '../services/api';

export function HomePage() {
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get('/tours');
        // Assume backend returns all tours, we can slice top 3 for featured
        const tours = response.data.data || response.data;
        setFeaturedTours(Array.isArray(tours) ? tours.slice(0, 3) : []);
      } catch (error) {
        console.error("Failed to fetch featured tours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const valueProps = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Best Price Guarantee',
      description: 'We guarantee the best prices for all our tours. Find a better deal? We\'ll match it!'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safe & Secure',
      description: 'Your safety is our priority. All tours are fully insured with certified guides.'
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Our customer support team is available around the clock to assist you.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Premium Experiences',
      description: 'Curated tours that showcase the best of Vietnam\'s culture and natural beauty.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'United States',
      rating: 5,
      text: 'The Ha Long Bay cruise was absolutely breathtaking! The organization was impeccable, and our guide was knowledgeable and friendly. A truly unforgettable experience.',
      avatar: '🇺🇸'
    },
    {
      name: 'David Chen',
      location: 'Singapore',
      rating: 5,
      text: 'Exploring Hoi An was magical. The ancient town, the lanterns, the food - everything exceeded our expectations. Highly recommend Vietnam Tours!',
      avatar: '🇸🇬'
    },
    {
      name: 'Emma Williams',
      location: 'Australia',
      rating: 5,
      text: 'The Sapa trekking tour was challenging but incredibly rewarding. The rice terraces are stunning, and staying with local families gave us authentic cultural insights.',
      avatar: '🇦🇺'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1737484126640-7381808c768b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYSUyMExvbmclMjBCYXklMjBWaWV0bmFtfGVufDF8fHx8MTc2NTQ5NDI3OHww&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl text-white mb-6">
              Discover Vietnam's Hidden Gems
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Experience authentic Vietnamese culture, breathtaking landscapes, and unforgettable adventures
            </p>
            
            {/* Search Bar */}
            <div className="mt-8">
              <SearchBar variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Featured Tours</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of the most popular Vietnamese destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-8 text-gray-500">Loading featured tours...</div>
            ) : featuredTours.length > 0 ? (
              featuredTours.map((tour) => (
                <TourCard key={tour._id || tour.id} id={tour._id || tour.id} {...tour} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">No tours available.</div>
            )}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full mb-4">
                  {prop.icon}
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-6">
            Ready to Start Your Vietnamese Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy travelers who have explored Vietnam with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tours"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-lg"
            >
              Browse All Tours
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
