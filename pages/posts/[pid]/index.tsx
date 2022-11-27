import { useRouter } from "next/router"

export default function Index({ post }) {
    // const route = useRouter();
    // const {pid, page} = route.query;
    return (
        <div>
            <h1> { post.title } </h1>
            <div>
                {post._id}
            </div>
            <div>
                {post.content}
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:4000/post');
    const posts = await res.json();

    const paths = posts.map((post: any)=>({
        params: { pid: post._id },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:4000/post/${params.pid}`);
    const post = await res.json();

    return {
        props: { post }
    }
}