import React from 'react';
import { Award, Compass, Heart, Users, CheckCircle } from 'lucide-react';

export function About() {
  const stats = [
    { label: 'Happy Travelers', value: '50K+' },
    { label: 'Tours Completed', value: '1,200+' },
    { label: 'Destinations Offered', value: '150+' },
    { label: 'Customer Rating', value: '4.9/5' },
  ];

  const values = [
    {
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      title: 'Expert Guidance',
      description: 'Our experienced local guides bring history, culture, and nature to life with authentic storytelling.',
    },
    {
      icon: <Heart className="w-6 h-6 text-orange-500" />,
      title: 'Passion for Travel',
      description: 'We love what we do. Every itinerary is crafted with careful attention to detail and a passion for discovery.',
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: 'Premium Quality',
      description: 'We partner with the best accommodation providers, restaurants, and transport services to ensure maximum comfort.',
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      title: 'Community First',
      description: 'We practice sustainable tourism, directly supporting local communities and preserving cultural heritage.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div 
        className="relative py-24 bg-cover bg-center text-white"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600570146487-34b4e0c4080a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.0&q=80&w=1080)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-950/90 backdrop-blur-[2px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            About Vietnam Tours
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Your gateway to discovering the timeless charm, breathtaking landscapes, and rich heritage of Vietnam.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 relative pb-2 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-600">
              Our Journey & Story
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2018, Vietnam Tours started with a single mission: to share the raw beauty and hidden secrets of our homeland with the world. What began as small boutique excursions has grown into a leading travel management platform, trusted by tens of thousands of global travelers.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We specialize in custom itineraries, luxury cruises, historical discovery trails, and active trekking adventures. Whether you seek the peaceful mist of Sapa's valleys, the dramatic karst pillars of Ha Long Bay, or the vibrant pulse of Ho Chi Minh City, we are dedicated to making your travel dreams a reality.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-800 font-medium">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Fully Licensed Tour Operator</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-800 font-medium">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>24/7 Multi-language Support Line</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-800 font-medium">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>100% Customized Tour Experiences</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 opacity-30 blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1562005094-c724030f99bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.0&q=80&w=1080" 
              alt="Hoi An lanterns" 
              className="relative rounded-2xl shadow-xl w-full object-cover h-[450px]"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="border-r last:border-0 border-gray-100 last:border-r-0">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              These principles form the foundation of every experience we curate and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
