export interface Experience {
  title: string;
  label?: string;
}

export interface Statistics {
  title: string;
  value: number;
}

export interface LinkItem {
  text: string;
  href: string;
}

export interface NavFooter {
  label: string;
  links: LinkItem[];
}

export interface Filter {
  budget?: number[];
  locations?: string[];
  categories?: string[];
}
