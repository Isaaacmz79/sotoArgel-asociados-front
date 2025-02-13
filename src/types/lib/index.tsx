export interface ArticleData {
    [key: string]: unknown;
  }
  
  export interface PostFrontmatter {
    title: string;
    description: string;
    publishedAt: string;
    tags: string[];
    readingTime: string;
  }
  