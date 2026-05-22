// Página de artículos — pendiente de implementación con Vite
export default function PostsPages() {
  return null;
}
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
