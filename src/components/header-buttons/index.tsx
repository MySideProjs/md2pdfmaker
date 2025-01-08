import { useToggle } from "react-use"
import { useMarkdownContent } from "../../state"
import { reportGA } from "../../utils/ga"
import { AppHelpModal } from "../app-help-modal"
import iconDownload from "./download-pdf.svg"
import iconRateReview from "./feedback-for-md-to-pdf.svg"
import helpCenter from "./help_center.svg"
import folderOpen from "./open-markdown-file.svg"

export const HeaderButtons = () => {
  const { loadFileAndOverwriteMarkdownContent } = useMarkdownContent()
  const [isHelpCenterModalOpen, toggleHelpCenterModal] = useToggle(false)

  const commonCls = "h-12 w-12 flex items-center justify-center border-0.5 border-solid border-gray cursor-pointer hover:bg-slate-200 active:bg-slate"
  const openFeedbackForm = () => {
    window.open("https://forms.gle/God6MvZ6imVXE5hs5")
  }

  return (
    <div className="flex flex-row w-full items-center justify-center">
      {/* buttons */}
      <div className="flex flex-row">
        <div
          className={`rounded-l-xl border-r-0.5 ${commonCls}`}
          onClick={() => {
            window.print()
            reportGA("clicked_download_pdf")
          }}
        >
          <img src={iconDownload} alt="export markdown to pdf" />
        </div>

        <div
          className={`${commonCls}`}
          onClick={() => {
            loadFileAndOverwriteMarkdownContent()
            reportGA("import_local_md")
          }}
        >
          <img src={folderOpen} alt="open a markdown file" />
        </div>

        <div
          className={`${commonCls}`}
          onClick={() => {
            toggleHelpCenterModal(true)
            reportGA("open_help_center")
          }}
        >
          <img src={helpCenter} alt="help center" />
        </div>

        <div
          className={`rounded-r-xl border-l-0.5 ${commonCls}`}
          onClick={() => {
            openFeedbackForm()
            reportGA("open_feedback_form")
          }}
        >
          <img src={iconRateReview} alt="feedback for markdown to pdf file" />
        </div>
      </div>

      {/* modals */}
      <AppHelpModal isOpen={isHelpCenterModalOpen} onRequestClose={() => toggleHelpCenterModal(false)} />
    </div>
  )
}
