import fs from "fs";
import matter from "gray-matter";

import Header from "../components/header"
import Card from "../components/card";


export default function Home({posts}) {
  return (
    <div>
      <Header />

      {posts.map(post => {
        // extract slug and frontmatter
        const {slug, frontmatter} = post;
        // extract frontmatter properties
        const {title, category, date, tags, excerpt} = frontmatter;
 
        return (<Card slug={slug} title={title} excerpt={excerpt} date={date} key={date + title}/>);
      })}

    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  var posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {slug, frontmatter,};
  });

  posts = posts.sort((a,b) => { 
    let tmp = a.frontmatter.date.localeCompare(b.frontmatter.date);
    if (tmp == 0) return a.frontmatter.title.localeCompare(b.frontmatter.title);
    else return -tmp; 
  });

  return {
    props: {
      posts
    }
  }
}