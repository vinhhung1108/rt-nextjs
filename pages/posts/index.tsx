export default function Blog({posts}) {
    return (
        <ul>
            { posts.map((post: any, index: number)=> (
                <li key={index}>
                    <strong>{post.title}</strong><br />
                    <span>{post._id}</span>
                </li>
            ))}
        </ul>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:4000/post');
    const posts = await res.json();
    return {
        props: { posts }
    }
}