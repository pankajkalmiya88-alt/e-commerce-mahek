export interface Review {
  id: string;
  customerName: string;
  customerInitial: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface ReviewCardProps {
  review: Review;
  className?: string;
}
