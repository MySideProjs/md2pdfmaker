import IconButton from "@mui/material/IconButton"
import IconFeedback from "@mui/icons-material/Feedback"
import { reportGA } from "../../utils/ga"

export const FeedbackButton = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="text-sm font-italic">Any feedback for markdown-to-pdf.com?</div>
      <IconButton size="small" aria-label="feedback">
        <IconFeedback
          fontSize="inherit"
          onClick={() => {
            window.open("https://forms.gle/God6MvZ6imVXE5hs5")
            reportGA("open_help_center")
          }}
          color="action"
        />
      </IconButton>
    </div>
  )
}
