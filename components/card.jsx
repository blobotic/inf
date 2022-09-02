import Link from "next/link";

export default function Card({slug, title, excerpt, date}) {
	return (<article className="card" key={title}>
				<Link href={`/posts/${slug}`}>
					<a>
						<h1 className="title">{title}</h1>
						<p className="excerpt">{excerpt}</p>
						<p className="date">{date}</p>
					</a>
				</Link>
				</article>)
}