import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export default function Discribe(){
    return(
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{"# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here\n# Your markdown here"}</ReactMarkdown>
    )
}