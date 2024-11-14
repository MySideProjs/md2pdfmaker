import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

export const markdown2html = (md: string) => {
  const processed = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(md)
    .value.toString()
    .replaceAll("&#x26;", "&")
  // This is like an patch to handle the remarkRehype plugin's problem

  return processed
}
