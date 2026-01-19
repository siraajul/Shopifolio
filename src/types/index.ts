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
