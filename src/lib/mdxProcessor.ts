// mdxProcessor.ts
import { ArticleData } from "../types/lib/index";
import matter from "gray-matter";
import readingTime from "reading-time";

// Usa import.meta.glob para obtener todos los archivos MDX
// La opción { as: "raw" } permite obtener el contenido del archivo como texto
const modules = import.meta.glob("/src/data/articles/*.mdx", { as: "raw" });

export async function getSlug(): Promise<string[]> {
  // Las llaves del objeto modules son las rutas de los archivos
  const slugs = Object.keys(modules).map((filePath) => {
    // Suponiendo que la ruta es algo como "/src/data/articles/mi-articulo.mdx"
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    const [slug] = fileName.split(".");
    return slug;
  });
  return slugs;
}

export async function getArticleFromSlug(slug: string) {
  // Construimos la ruta del archivo a partir del slug
  const filePath = `/src/data/articles/${slug}.mdx`;
  const importer = modules[filePath];

  if (!importer) {
    throw new Error(`No se encontró el artículo: ${slug}`);
  }

  // importer es una función asíncrona que devuelve el contenido del archivo
  const source = (await importer()) as string;
  
  // Procesamos el contenido con gray-matter para extraer frontmatter
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      tags: data.tags,
      readingTime: readingTime(source).text,
      ...data,
    },
  };
}

export async function getAllArticles() {
  const modules = import.meta.glob("/src/data/articles/*.mdx", { as: "raw" });

  const allArticles: ArticleData[] = [];

  for (const path in modules) {
    const source = await modules[path]() as string;
    const { data } = matter(source);

    allArticles.push({
      slug: path.split("/").pop()?.replace(".mdx", "") || "",
      title: data.title || "Untitled",
      description: data.description || "",
      publishedAt: data.publishedAt || "",  // Asegúrate de que este dato se encuentre en el frontmatter
      tags: data.tags || [],
      readingTime: readingTime(source).text,
    });
  }

  return allArticles;
}
