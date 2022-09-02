import Link from "next/link";

export default function Card({slug, title, excerpt, date}) {
	return (<article class="card" key={title}>
				<Link href={`/posts/${slug}`}>
					<a>
						<h1 class="title">{title}</h1>
						<p class="excerpt">{excerpt}</p>
						<p class="date">{date}</p>
					</a>
				</Link>
				</article>)
}