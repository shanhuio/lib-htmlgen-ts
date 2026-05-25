import * as React from 'react' // for tsx

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function md(s: string) {
    let src = s.replace(/\|/g, '`')
    return <ReactMarkdown children={src} rehypePlugins={[rehypeRaw]} />
}
