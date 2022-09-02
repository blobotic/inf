import Head from "next/head";

import fs from "fs";
import matter from "gray-matter";

var hljs = require("highlight.js");
var md = require('markdown-it')({
      html: true, 
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>';
          } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      },
      }),
    mk = require('@traptitech/markdown-it-katex');
md.use(mk, {"blockClass": "math-block", "errorColor" : " #cc0000"});

import Header from "../../components/header";

export default function Post({frontmatter, content}) {
	const {title, category, date, tags, excerpt} = frontmatter;

	return (<div class="post">
    <Head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous" />
    </Head>
		
    <Header />
		<h1 class="title">{title}</h1>
		<p class="date">{date}</p>
		<p class="category">Category: {category}</p>
    <p class="tags">Tags: {tags.join()}</p>
    <hr class="sep" />
		<div class="content" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
		</div>)
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: {slug} }) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);

    return {
      props: {
        frontmatter,
        content,
      },
    };
  }