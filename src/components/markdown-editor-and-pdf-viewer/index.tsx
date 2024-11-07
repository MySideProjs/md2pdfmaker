import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer"
import { toMdTree } from "../../utils/formatter"

export type MarkdownEditorAndPdfViewerProps = { markdown: string }
export const MarkdownEditorAndPdfViewer = (p: MarkdownEditorAndPdfViewerProps) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  })
  const res = toMdTree(p.markdown)
  console.log(res)
  return (
    <div className=" w-full flex items-center justify-center mt-20">
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  )
}
