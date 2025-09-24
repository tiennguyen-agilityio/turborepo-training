export interface Experience {
  readonly title: string;
  readonly label: string;
}

export interface Statistics {
  readonly title: string;
  readonly value: number;
}

export interface LinkItem {
  readonly text: string;
  readonly href: string;
}

export interface NavFooter {
  readonly label: string;
  readonly links: LinkItem[];
}

export interface Filter {
  budget?: number[];
  locations?: string[];
  categories?: string[];
}
