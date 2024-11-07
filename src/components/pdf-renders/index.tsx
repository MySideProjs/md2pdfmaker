import { Text } from "@react-pdf/renderer"
import { PropsWithChildren } from "react"
import { MdNode } from "../../utils/formatter"

type MdNodeRenderProps = { node: MdNode }
export const MdNodeRender = (p: MdNodeRenderProps) => {
  console.log("MdNodeRender")

  switch (p.node.type) {
    case "text":
      return <Text>{p.node.value}</Text>

    case "heading":
      return <HeadingWrapper level={p.node.depth}>{/* <Text>{p.node.children[0]}</Text> */}</HeadingWrapper>

    default:
      return <>Node type Not Supported: {p.node.type}</>
  }
}

type HeadingWrapperProps = PropsWithChildren<{ level: number }>
export const HeadingWrapper = (p: HeadingWrapperProps) => {
  return <div>{p.children}</div>
}
