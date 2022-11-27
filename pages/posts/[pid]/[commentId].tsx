import { useRouter } from "next/router";

export default function Comment() {
    const route = useRouter();
    const { pid, commentId, page } = route.query;
    return (
        <div>
            Comment {commentId} for post {pid} with page {page}
        </div>
    )
}