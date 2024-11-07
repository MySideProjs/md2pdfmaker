import remarkParse from "remark-parse"
import { unified } from "unified"
import { ArrayValues } from "type-fest"

export const toMdTree = (content: string) => {
  const res = unified().use(remarkParse).parse(content)
  return res
}
export type MdNodes = ReturnType<typeof toMdTree>["children"]
export type MdNode = ArrayValues<MdNodes>
