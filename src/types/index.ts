export type CategoryId = 
  | 'vases-pottery'
  | 'lamps-lighting'
  | 'floral-decor'
  | 'wall-art'
  | 'candles'
  | 'plants-planters'
  | 'wooden-crafts'
  | 'traditional-decor'
  | 'table-decor'
  | 'gift-decor';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  count: number;
  description: string;
  highlightTag: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  detailedStory: string;
  materials: string;
  dimensions: string;
  origin: string;
  image: string;
  inStock: boolean;
  isBestseller?: boolean;
  collectionIds: string[];
  stylingTip: string;
}

export interface CuratedCollection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  palette: string[];
  featuredImage: string;
  productIds: string[];
}

export interface InspirationStyle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroNote: string;
  suggestedProductIds: string[];
  keyElements: string[];
  colorPalette: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AIPlanItem {
  productId?: string;
  name: string;
  category: string;
  price: number;
  reason: string;
  roomPlacement: string;
  image?: string;
}

export interface AIPlanResponse {
  collectionTitle: string;
  aestheticSummary: string;
  designPhilosophy: string;
  items: AIPlanItem[];
  totalCost: number;
  budgetStatus: string; // e.g. "Within budget by ₹1,505"
  stylingAdvice: string;
  colorHarmony: { name: string; hex: string }[];
  suggestedAlternative?: string;
}

export interface AIPlanRequest {
  roomType: string;
  aesthetic: string;
  budget: number;
  specificPreferences?: string;
  currentDecorItems?: string[];
}
