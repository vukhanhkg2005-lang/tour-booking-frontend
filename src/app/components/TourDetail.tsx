import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Users, Star, Calendar, CheckCircle, 
  Phone, Mail, Shield, Award, Heart, Share2, 
  ChevronRight, Minus, Plus, Loader2 
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const getTourImages = (name: string, coverImage: string): string[] => {
  const n = name.toLowerCase();
  const cover = coverImage || 'https://images.unsplash.com/photo-1562005094-c724030f99bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.0&q=80&w=1080';
  
  if (n.includes('sapa')) {
    return [
      cover || '/images/sapa_cover.jpg',
      '/images/sapa_detail1.jpg',
      '/images/sapa_detail2.jpg'
    ];
  }
  if (n.includes('cát bà') || n.includes('lan ha') || n.includes('cat ba') || n.includes('lạn ha')) {
    return [
      cover || '/images/catba_cover.jpg',
      '/images/catba_detail1.jpg',
      '/images/catba_detail2.jpg'
    ];
  }
  if (n.includes('long') || n.includes('hạ long') || n.includes('ha long')) {
    return [
      cover || '/images/halong_cover.jpg',
      '/images/halong_detail1.jpg',
      '/images/halong_detail2.jpg'
    ];
  }
  if (n.includes('giang')) {
    return [
      cover || '/images/hagiang_cover.jpg',
      '/images/hagiang_detail1.jpg',
      '/images/hagiang_detail2.jpg'
    ];
  }
  if (n.includes('hue') || n.includes('huế')) {
    return [
      cover || '/images/hue_cover.jpg',
      '/images/hue_detail1.jpg',
      '/images/hue_detail2.jpg'
    ];
  }
  if (n.includes('hoi an') || n.includes('hội an')) {
    return [
      cover || '/images/hoian_cover.jpg',
      '/images/hoian_detail1.jpg',
      '/images/hoian_detail2.jpg'
    ];
  }
  if (n.includes('nang') || n.includes('nẵng') || n.includes('ba na') || n.includes('bà nà') || n.includes('golden bridge')) {
    return [
      cover || '/images/banahills_cover.jpg',
      '/images/banahills_detail1.jpg',
      '/images/banahills_detail2.jpg'
    ];
  }
  if (n.includes('cave') || n.includes('phong nha')) {
    return [
      cover || '/images/phongnha_cover.jpg',
      '/images/phongnha_detail1.jpg',
      '/images/phongnha_detail2.jpg'
    ];
  }
  if (n.includes('con dao') || n.includes('côn đảo')) {
    return [
      cover || '/images/condao_cover.jpg',
      '/images/condao_detail1.jpg',
      '/images/condao_detail2.jpg'
    ];
  }
  if (n.includes('nha trang')) {
    return [
      cover || '/images/nhatrang_cover.jpg',
      '/images/nhatrang_detail1.jpg',
      '/images/nhatrang_detail2.jpg'
    ];
  }
  if (n.includes('beach')) {
    return [
      cover,
      'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800'
    ];
  }
  if (n.includes('quy nhon') || n.includes('quy nhơn')) {
    return [
      cover || '/images/quynhon_cover.jpg',
      '/images/quynhon_detail1.jpg',
      '/images/quynhon_detail2.jpg'
    ];
  }
  if (n.includes('phu quoc') || n.includes('phú quốc')) {
    return [
      cover || '/images/phuquoc_cover.jpg',
      '/images/phuquoc_detail1.jpg',
      '/images/phuquoc_detail2.jpg'
    ];
  }
  if (n.includes('tây ninh') || n.includes('tay ninh')) {
    return [
      cover || '/images/tayninh_cover.jpg',
      '/images/tayninh_detail1.jpg',
      '/images/tayninh_detail2.jpg'
    ];
  }
  if (n.includes('da lat') || n.includes('đà lạt')) {
    return [
      cover || '/images/dalat_cover.jpg',
      '/images/dalat_detail1.jpg',
      '/images/dalat_detail2.jpg'
    ];
  }
  if (n.includes('mui ne') || n.includes('mũi né') || n.includes('dunes')) {
    return [
      cover || '/images/muine_cover.jpg',
      '/images/muine_detail1.jpg',
      '/images/muine_detail2.jpg'
    ];
  }
  if (n.includes('mekong') || n.includes('floating') || n.includes('sông') || n.includes('river')) {
    return [
      cover || '/images/mekong_cover.jpg',
      '/images/mekong_detail1.jpg',
      '/images/mekong_detail2.jpg'
    ];
  }
  if (n.includes('hanoi') || n.includes('hà nội') || n.includes('food') || n.includes('street')) {
    return [
      cover || '/images/hanoi_cover.jpg',
      '/images/hanoi_detail1.jpg',
      '/images/hanoi_detail2.jpg'
    ];
  }
  if (n.includes('saigon') || n.includes('sài gòn') || n.includes('ho chi minh') || n.includes('hồ chí minh')) {
    return [
      cover || '/images/hcmc_cover.jpg',
      '/images/hcmc_detail1.jpg',
      '/images/hcmc_detail2.jpg'
    ];
  }
  if (n.includes('thác') || n.includes('waterfall') || n.includes('ba be') || n.includes('bà bể') || n.includes('ban gioc') || n.includes('bản giốc') || n.includes('cao bang') || n.includes('cao bằng')) {
    return [
      cover || '/images/babe_cover.jpg',
      '/images/babe_detail1.jpg',
      '/images/babe_detail2.jpg'
    ];
  }
  if (n.includes('ninh binh') || n.includes('ninh bình') || n.includes('trang an') || n.includes('tràng an')) {
    return [
      cover || '/images/ninhbinh_cover.jpg',
      '/images/ninhbinh_detail1.jpg',
      '/images/ninhbinh_detail2.jpg'
    ];
  }

  return [
    cover,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800'
  ];
};

const destinationCoordinates: { [key: string]: [number, number] } = {
  'ha long': [20.9754, 107.0463],
  'sapa': [22.3364, 103.8438],
  'ha giang': [22.8233, 104.9836],
  'hue': [16.4637, 107.5908],
  'hoi an': [15.8801, 108.3380],
  'da nang': [16.0544, 108.2022],
  'phong nha': [17.5907, 106.2736],
  'nha trang': [12.2388, 109.1967],
  'da lat': [11.9404, 108.4583],
  'mui ne': [10.9443, 108.2862],
  'can tho': [10.0452, 105.7469],
  'mekong': [10.0452, 105.7469],
  'phu quoc': [10.2899, 103.9840],
  'con dao': [8.6833, 106.6000],
  'hanoi': [21.0285, 105.8542],
  'hà nội': [21.0285, 105.8542],
  'saigon': [10.8231, 106.6297],
  'ho chi minh': [10.8231, 106.6297],
  'hồ chí minh': [10.8231, 106.6297],
  'cao bang': [22.6687, 106.2625],
  'cat ba': [20.7275, 107.0486],
  'cát bà': [20.7275, 107.0486],
  'ninh binh': [20.2520, 105.9750],
  'ninh bình': [20.2520, 105.9750],
  'quy nhon': [13.7820, 109.2197],
  'quy nhơn': [13.7820, 109.2197],
  'tay ninh': [11.3684, 106.1130],
  'tây ninh': [11.3684, 106.1130]
};

const getCoordinatesForDestination = (nameOrLocation: string): [number, number] => {
  const norm = nameOrLocation.toLowerCase();
  for (const key of Object.keys(destinationCoordinates)) {
    if (norm.includes(key)) {
      return destinationCoordinates[key];
    }
  }
  return [16.0544, 108.2022];
};

export function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reviews states
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [commentInput, setCommentInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Map states
  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await api.get(`/tours/${id}/reviews`);
      setReviewsList(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Fetch tour by ID
  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/tours/${id}`);
        const data = response.data;
        
        // Construct detailed tour matching the design expected fields
        const durationDaysVal = data.durationDays || 3;
        const processedTour = {
          id: data._id || data.id,
          name: data.name,
          location: data.destination,
          price: data.price,
          duration: `${durationDaysVal} Days / ${durationDaysVal - 1 > 0 ? durationDaysVal - 1 : 1} Nights`,
          groupSize: `Up to ${data.maxParticipants || 15} people`,
          rating: data.rating !== undefined ? data.rating : 4.8,
          reviews: data.reviews !== undefined ? data.reviews : 0,
          images: getTourImages(data.name, data.image),
          description: data.description || 'Trải nghiệm du lịch tuyệt vời tại danh lam thắng cảnh Việt Nam với những dịch vụ cao cấp, chất lượng dịch vụ chuẩn 5 sao và lịch trình phong phú.',
          highlights: [
            `Khám phá những địa danh nổi tiếng bậc nhất tại ${data.destination}`,
            'Tham gia chèo thuyền kayak, bơi lội hoặc leo núi dã ngoại lý thú',
            'Thưởng thức các bữa ăn hải sản và đặc sản địa phương phong phú',
            'Tìm hiểu cuộc sống văn hóa truyền thống của cộng đồng dân cư bản địa',
            'Đội ngũ tài xế và hướng dẫn viên đồng hành chuyên nghiệp, thân thiện',
            'Đã bao gồm tất cả các vé thắng cảnh và bảo hiểm du lịch trọn gói'
          ],
          itinerary: [
            {
              day: 'Day 1',
              title: `Chào mừng đến với ${data.destination}`,
              activities: [
                '08:00 AM - Xe đón quý khách tại điểm hẹn trung tâm khởi hành',
                `12:00 PM - Đến điểm dừng chân tại ${data.destination}, nhận phòng nghỉ ngơi`,
                '01:00 PM - Dùng bữa trưa chào mừng tại nhà hàng đặc sản địa phương',
                '03:00 PM - Bắt đầu hành trình khám phá và ngắm hoàng hôn tuyệt đẹp',
                '07:00 PM - Dùng bữa tối và tự do dạo phố, trải nghiệm về đêm'
              ]
            },
            {
              day: 'Day 2',
              title: 'Khám phá chi tiết & Trải nghiệm thực tế',
              activities: [
                '07:00 AM - Thưởng thức bữa sáng tự chọn thơm ngon tại khách sạn',
                '08:30 AM - Tham gia các hoạt động ngoài trời hấp dẫn (chèo xuồng, tham quan hang động, trekking)',
                '12:30 PM - Ăn trưa tại khu ẩm thực ẩm thực truyền thống địa phương',
                '03:00 PM - Giao lưu văn hóa địa phương và mua sắm đồ thủ công lưu niệm',
                '07:00 PM - Tiệc nướng BBQ tối ấm cúng cùng đoàn'
              ]
            },
            {
              day: `Day ${durationDaysVal}`,
              title: 'Thư giãn bình minh & Tạm biệt hành trình',
              activities: [
                '06:30 AM - Ngắm bình minh và tham gia lớp khởi động năng lượng mới',
                '08:00 AM - Ăn sáng, tự do bơi lội hoặc dạo chơi chụp ảnh check-in',
                '11:30 AM - Làm thủ tục trả phòng khách sạn và ăn trưa chia tay',
                '01:30 PM - Quý khách lên xe khởi hành quay trở về điểm hẹn ban đầu',
                '05:30 PM - Xe về tới điểm xuất phát ban đầu, kết thúc chuyến đi tốt đẹp'
              ]
            }
          ],
          included: [
            'Vé tham quan tất cả các địa danh theo chương trình',
            'Tất cả các bữa ăn chính cao cấp được đề cập',
            'Phương tiện di chuyển máy lạnh đời mới sang trọng',
            'Hướng dẫn viên tiếng Anh/Việt nhiệt tình chu đáo',
            'Bảo hiểm du lịch trọn gói mức bồi thường cao',
            'Nước uống tinh khiết miễn phí suốt hành trình'
          ],
          notIncluded: [
            'Các chi phí cá nhân (mua sắm, điện thoại, giặt ủi)',
            'Tiền tip cho hướng dẫn viên và tài xế phục vụ đoàn',
            'Đồ uống có cồn trong các bữa ăn'
          ],
          guide: {
            name: 'Nguyễn Hữu Trí',
            rating: 4.9,
            tours: 198,
            languages: ['English', 'Vietnamese']
          }
        };

        setTour(processedTour);
        // Pre-fill selectedDate with dynamic default values or the tour's startDate
        if (data.startDate) {
          const dateStr = new Date(data.startDate).toISOString().split('T')[0];
          setSelectedDate(dateStr);
        }
      } catch (err: any) {
        console.error(err);
        setError('Không thể tải thông tin chi tiết tour. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
    fetchReviews();
  }, [id]);

  // Dynamic script and CSS loading for LeafletJS
  useEffect(() => {
    let cssLink = document.querySelector('link[href*="leaflet.css"]');
    if (!cssLink) {
      cssLink = document.createElement('link');
      (cssLink as any).rel = 'stylesheet';
      (cssLink as any).href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);
    }

    let jsScript = document.querySelector('script[src*="leaflet.js"]');
    if (!(window as any).L) {
      if (!jsScript) {
        jsScript = document.createElement('script');
        (jsScript as any).src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        (jsScript as any).async = true;
        document.body.appendChild(jsScript);
        jsScript.addEventListener('load', () => {
          setMapLoaded(true);
        });
      } else {
        jsScript.addEventListener('load', () => {
          setMapLoaded(true);
        });
      }
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Initialize and clean up Map
  useEffect(() => {
    if (!mapLoaded || !tour) return;

    const coords = getCoordinatesForDestination(tour.name || tour.location);
    const L = (window as any).L;
    if (!L) return;

    const container = document.getElementById('tour-map');
    if (!container) return;

    let mapInstance: any;
    try {
      mapInstance = L.map('tour-map').setView(coords, 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      const marker = L.marker(coords).addTo(mapInstance);
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <h4 style="margin: 0 0 4px 0; color: #1e3a8a; font-size: 14px;">\${tour.name}</h4>
          <p style="margin: 0; color: #4b5563; font-size: 12px;">📍 \${tour.location}</p>
        </div>
      `).openPopup();
    } catch (e) {
      console.warn("Leaflet map initialization error:", e);
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapLoaded, tour]);

  const handleSubmitReview = async () => {
    if (!commentInput.trim()) {
      setReviewError('Vui lòng nhập nhận xét của bạn');
      return;
    }
    
    setIsSubmittingReview(true);
    setReviewError(null);
    setReviewSuccess(false);

    try {
      await api.post(`/tours/\${id}/reviews`, {
        rating: ratingInput,
        comment: commentInput
      });

      setReviewSuccess(true);
      setCommentInput('');
      setRatingInput(5);
      
      // Refresh reviews list
      fetchReviews();
      
      // Refresh tour details to update the aggregate rating/reviews
      const response = await api.get(`/tours/\${id}`);
      const data = response.data;
      setTour((prevTour: any) => ({
        ...prevTour,
        rating: data.rating !== undefined ? data.rating : prevTour.rating,
        reviews: data.reviews !== undefined ? data.reviews : prevTour.reviews,
      }));
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setReviewError(err.response.data.message);
      } else {
        setReviewError('Đã xảy ra lỗi khi gửi nhận xét. Vui lòng thử lại sau.');
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Đang tải thông tin chi tiết gói tour...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl text-gray-900 mb-2 font-semibold">Đã xảy ra lỗi</h2>
          <p className="text-gray-600 mb-6">{error || 'Không tìm thấy thông tin tour.'}</p>
          <button 
            onClick={() => navigate('/tours')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
          >
            Quay lại danh sách tour
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = tour.price * guests;

  const handleBookNow = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/tour/${id}` } });
      return;
    }

    if (!selectedDate) {
      alert('Vui lòng chọn ngày khởi hành');
      return;
    }

    // Navigate to checkout with booking data
    navigate('/checkout', {
      state: {
        tourId: tour.id,
        tourName: tour.name,
        tourPrice: tour.price,
        guests,
        selectedDate,
        tourImage: tour.images[0],
        duration: tour.duration
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src={tour.images[0]}
                alt={tour.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tour.images.slice(1, 3).map((image: string, index: number) => (
                <div key={index} className="relative h-44 md:h-60 rounded-xl overflow-hidden shadow-md">
                  <ImageWithFallback
                    src={image}
                    alt={`${tour.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="relative h-44 md:h-60 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
                <div className="text-white text-center">
                  <span className="text-2xl font-semibold block">+5 Photos</span>
                  <span className="text-xs text-blue-200">Galleries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Tour Details */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl text-gray-900 mb-3 font-semibold">{tour.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{tour.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-gray-900 font-medium">{tour.rating}</span>
                  </div>
                  <span className="text-gray-600">({tour.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{tour.groupSize}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">Free Cancellation</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">Best Seller</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl text-gray-900 mb-4 font-semibold">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl text-gray-900 mb-4 font-semibold">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl text-gray-900 mb-6 font-semibold">Detailed Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6">
                    <h3 className="text-xl text-gray-900 mb-2 font-semibold">{day.day}: {day.title}</h3>
                    <ul className="space-y-2">
                      {day.activities.map((activity: string, actIndex: number) => (
                        <li key={actIndex} className="flex items-start space-x-2 text-gray-700">
                          <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Included/Not Included */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-gray-900 mb-4 font-semibold">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-4 font-semibold">What's Not Included</h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tour Location Map */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl text-gray-900 mb-4 font-semibold">Tour Location</h2>
              <div id="tour-map" className="w-full h-80 rounded-xl shadow border relative z-10">
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-xl">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mr-2" />
                    <span className="text-gray-500 font-medium">Đang tải bản đồ tương tác...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tour Guide */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl text-gray-900 mb-6 font-semibold">Your Tour Guide</h2>
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 font-semibold shadow">
                  HT
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-2 font-semibold">{tour.guide.name}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-gray-700 font-medium">{tour.guide.rating}</span>
                    </div>
                    <span className="text-gray-600">{tour.guide.tours} tours completed</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600 font-medium">Languages:</span>
                    {tour.guide.languages.map((lang: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Call</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl text-gray-900 mb-6 font-semibold flex items-center justify-between">
                <span>Reviews & Ratings</span>
                <span className="flex items-center text-sm font-normal text-gray-600">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold text-gray-900 mr-1">{tour.rating}</span>
                  ({tour.reviews} reviews)
                </span>
              </h2>

              {/* Review Form (Authenticated Users only) */}
              {isAuthenticated ? (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg text-gray-900 font-semibold mb-4">Write a Review</h3>
                  
                  {reviewSuccess && (
                    <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                      Cảm ơn bạn đã gửi đánh giá thành công!
                    </div>
                  )}

                  {reviewError && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                      {reviewError}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingInput(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= ratingInput
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-200'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nhận xét</label>
                    <textarea
                      rows={4}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Chia sẻ trải nghiệm thực tế của bạn về gói tour này..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white text-gray-900 resize-none shadow-sm text-sm"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmitReview}
                    disabled={isSubmittingReview}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center disabled:opacity-50 text-sm"
                  >
                    {isSubmittingReview ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      'Gửi nhận xét'
                    )}
                  </button>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center shadow-sm">
                  <p className="text-gray-600 mb-3 text-sm">Vui lòng đăng nhập để gửi đánh giá và nhận xét của bạn.</p>
                  <button
                    onClick={() => navigate('/login', { state: { from: `/tour/${id}` } })}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors text-sm"
                  >
                    Đăng nhập ngay
                  </button>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {loadingReviews ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : reviewsList.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-sm">
                    Chưa có đánh giá nào cho gói tour này. Hãy là người đầu tiên trải nghiệm và chia sẻ!
                  </div>
                ) : (
                  reviewsList.map((review) => (
                    <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow">
                            {review.user?.name ? review.user.name.split(' ').pop().slice(0, 2).toUpperCase() : 'KH'}
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-semibold text-sm">{review.user?.name || 'Khách hàng'}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center bg-yellow-50 px-2.5 py-1 rounded-lg">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-xs font-semibold text-gray-800">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed pl-13">
                        {review.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24 border border-gray-100">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl text-blue-600 font-semibold">${tour.price}</span>
                  <span className="text-gray-600">per person</span>
                </div>
                <p className="text-sm text-gray-600">Free cancellation up to 24 hours before</p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-2 font-medium">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white font-medium"
                  />
                </div>
              </div>

              {/* Guest Selection */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-2 font-medium">Number of Guests</label>
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-700" />
                  </button>
                  <span className="text-lg text-gray-900 font-medium">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">${tour.price} x {guests} guests</span>
                  <span className="text-gray-900 font-medium">${tour.price * guests}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Service fee</span>
                  <span className="text-gray-900 font-medium">$49</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">Total</span>
                    <span className="text-2xl text-blue-600 font-semibold">${totalPrice + 49}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg mb-4 font-semibold"
                onClick={handleBookNow}
              >
                Book Now
              </button>

              <p className="text-xs text-center text-gray-600">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}