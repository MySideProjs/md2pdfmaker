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
## How to use it?

- Open an markdown file or just start writing
- Edit Styles
- Save it as PDF

**Compatibility**
- Chrome & Edge: Suits the best
- Firefox: Limited
  - Not be able to custom margin color when print 
  - Not be able to load local fonts
- Safari: Limited
  - Not be able to custom margin color & size print 
  - Not be able to load local fonts
  
`
