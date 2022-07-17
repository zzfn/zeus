import {Editor} from "@bytemd/react";
import 'bytemd/dist/index.min.css'
import gfm from "@bytemd/plugin-gfm";
const plugins = [
    gfm(),
]
const MarkdownEditor = (props:any) => {
    const {value='',onChange}=props
    return <Editor
        value={value}
        plugins={plugins}
        onChange={onChange}
    />
}

export default MarkdownEditor