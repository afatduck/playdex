import { useCallback, useState, type ChangeEvent, type FormEvent } from "react"
import postComment from "../requests/postComment"

function PostComment({gameId, addCommnent}: PostCommentProps) {

    const [text, setText] = useState("")

    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    }, [setText])

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()
        if (!text) return

        postComment(gameId, text).then(res => {
            if (res.success) {
                addCommnent(res.data.comment_id, text)
            }
        })

    }, [text, gameId, addCommnent])

    return <form onSubmit={handleSubmit}>
    <textarea value={text} 
    className="p-2 border-2"
    onChange={handleChange} 
    rows={3}
    cols={100}
    placeholder="ajde podijeli nesto sa nama" />

    <button type="submit" className="border-2 block">u nebO!</button>

    </form>

}

interface PostCommentProps {
    gameId: number,
    addCommnent: (id: number, text: string) => void
}

export default PostComment