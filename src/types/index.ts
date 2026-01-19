export interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: string | number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
}

// Sanity Interfaces
export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    hotspot?: any;
    crop?: any;
}

export interface SanityGalleryItem {
    images?: SanityImage[];
}

export interface SanityImpactStat {
    value: string;
    label: string;
    percentage: string;
}

export interface SanityIndustryItem {
    name: string;
    description?: string;
    image?: SanityImage | string; // Can be Sanity object or fallback URL string if mixed
}
