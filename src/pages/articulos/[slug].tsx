import "highlight.js/styles/atom-one-dark-reasonable.css";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { getSlug, getArticleFromSlug } from "../../lib/mdxProcessor";
import Container5xl from "../../components/Layout/Container5xl";
import Layout from "../../components/Layout/Layout";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

// Definiciones de tipos para el frontmatter y el artículo
interface Frontmatter {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
  // Agrega otros campos según tus necesidades
}

interface ArticleProps {
  slug: string;
  source: MDXRemoteSerializeResult;
  frontmatter: Frontmatter;
}

interface BlogPageProps {
  article: ArticleProps;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Blog: NextPage<BlogPageProps> = ({ article: { source, frontmatter } }) => {
  return (
    <Layout
      headTitle={frontmatter.title}
      headDescription={frontmatter.description}
      keywords={frontmatter.tags.join(", ")}
    >
      <Container5xl>
        {/* Renderizamos el contenido MDX para que 'source' se utilice */}
        <MDXRemote {...source} />
      </Container5xl>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const slugs = await getSlug();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps, Params> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { properties: { className: ["anchor"] } },
          { behaviour: "wrap" },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      article: {
        slug,
        source: mdxSource,
        frontmatter,
      },
    },
  };
};

export default Blog;