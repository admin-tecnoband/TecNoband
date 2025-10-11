// Type definitions for the shape of data/site-data.json
// This file provides a SiteData type and makes JSON imports typed as SiteData

declare namespace SiteDataTypes {
  interface BlogHero {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
  }

  interface BlogSection {
    badge: string;
    heading: string;
    description: string;
  }

  export interface Blog {
    hero: BlogHero;
    section: BlogSection;
  }

  interface FeatureItem {
    title: string;
    description: string;
    pills: string[];
  }

  interface FeaturesHero {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
  }

  interface FeaturesSection {
    badge: string;
    heading: string;
    description: string;
  }

  export interface Features {
    hero: FeaturesHero;
    heroCTAs: { primary: string; secondary: string };
    section: FeaturesSection;
    items: FeatureItem[];
  }

  interface StatItem {
    value: string;
    title: string;
    desc: string;
  }

  interface HomeHero {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
  }

  export interface Home {
    hero: HomeHero;
    heroCTAs: { primary: string; secondary: string };
    stats: {
      badge: string;
      heading: string;
      description: string;
      items: StatItem[];
    };
    features: {
      badge: string;
      heading: string;
      description: string;
      items: FeatureItem[];
    };
    testimonials: { heading: string; subtitle: string };
    industry: { heading: string; description: string };
    cta: {
      heading: string;
      description: string;
      primary: string;
      secondary: string;
    };
  }

  interface AboutValueItem {
    title: string;
    description: string;
  }

  interface AboutTeamMember {
    name: string;
    role: string;
    bio: string;
  }

  export interface About {
    hero: { titlePrefix: string; titleHighlight: string; subtitle: string };
    story: { heading: string; paragraphs: string[] };
    values: { heading: string; items: AboutValueItem[] };
    team: { heading: string; members: AboutTeamMember[] };
  }

  export interface SiteData {
    blog: Blog;
    features: Features;
    home: Home;
    about: About;
    // add other top-level sections here if needed
  }
}

declare module "*.json" {
  const value: SiteDataTypes.SiteData;
  export default value;
}
