import Layout from "../../components/Layout/Layout"; 
import { getAllArticles } from "../../lib/mdxProcessor";
import { ArticleData } from "../../types/lib/index";
import Link from "next/link";

// Definición de la interface para las props del componente
interface PostsPagesProps {
  articles: ArticleData[];
}

export default function PostsPages({ articles }: PostsPagesProps) {
  return (
    <Layout headDescription="Articles page" headTitle="Articles">
      <h1>Articles</h1>
      <ul>
        {articles.map((article, index) => {
          // Se asume que cada artículo tiene 'slug' y 'title'
          const slug = article.slug as string;
          const title = article.title as string;
          return (
            <li key={index}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();

  console.log({ articles });

  // Se asume que cada artículo tiene una propiedad "publishedAt" de tipo string.
  const sortedArticles = articles.sort((a, b) => {
    // Extraemos las fechas y las tratamos como strings.
    const publishedAtA = a.publishedAt as string;
    const publishedAtB = b.publishedAt as string;
    if (publishedAtA > publishedAtB) return 1;
    if (publishedAtA < publishedAtB) return -1;
    return 0;
  });

  return { props: { articles: sortedArticles } };
}
