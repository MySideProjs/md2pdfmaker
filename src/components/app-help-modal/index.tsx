import Markdown from "react-markdown"
import Modal from "react-modal"

export type AppHelpModalProps = Modal.Props
export const AppHelpModal = (p: AppHelpModalProps) => {
  return (
    <Modal
      {...p}
      style={{
        content: { inset: "12% 10% 12% 10%" },
      }}
    >
      <Markdown className="font-sans">{helpCenterMdContent}</Markdown>
    </Modal>
  )
}

export const helpCenterMdContent = `
# How to use it?

**Steps**
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

**FAQ**
- Q: How to make background color works when print it?
- A: In the print page, expand 'More settings', check 'Background graphics'

`
