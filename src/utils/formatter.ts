import remarkParse from "remark-parse"
import { unified } from "unified"

export const toMdTree = (content: string) => {
  const res = unified().use(remarkParse).parse(content)
  console.log(res)
}
