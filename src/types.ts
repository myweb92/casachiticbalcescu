export interface Room {
  id: string;
  name: string;
  type: 'deluxe' | 'budget';
  tag: string; // 'Luxury' or 'Best Seller'
  tagColor: string;
  size: string; // e.g. "16 m²"
  capacity: string; // e.g. "1 Adult" or "2 Adults"
  bed: string; // e.g. "1 Single Bed"
  images: string[];
  description: string;
  amenities: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  source: string; // e.g. "Booking.com"
  date: string;
  content: string;
  avatarLetter: string;
}

export interface BookingInquiry {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}
