import Markdown from "react-markdown"
import Modal from "react-modal"

export type AppHelpModalProps = Modal.Props
export const AppHelpModal = (p: AppHelpModalProps) => {
  return (
    <Modal
      {...p}
      style={{
        content: { inset: 300 },
      }}
    >
      <Markdown>{readme}</Markdown>
    </Modal>
  )
}

const readme = `
## How to use it

1. Open an markdown file or just start writing
2. Edit Styles
3. Save it as PDF

`
