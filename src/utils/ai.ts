// import { PreviewMode } from "../state"

// export const aiGenMarkdown = async (
//   type: PreviewMode,
//   options: {
//     language: string
//     prompt: string
//   },
// ) => {
//   var myHeaders = new Headers()
//   myHeaders.append("Authorization", "Bearer sk-Jgl0PKrv2U80iYAdJrtdSeqF4EoW2P4A1mAAo7R2NDjFZaxK")
//   myHeaders.append("Content-Type", "application/json")

//   var raw = JSON.stringify({
//     model: "deepseek-v3",
//     messages: [
//       {
//         role: "user",
//         content: genPrompt(initInfo),
//       },
//     ],
//   })

//   return (
//     fetch("https://api.chatanywhere.tech/v1/chat/completions", {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     })
//       .then((response) => response.json())
//       .then((response) => response.choices[0].message.content)
//       // .then((r) => {
//       //     console.log("api res message")
//       //     console.log(r)
//       //     return r
//       // })
//       .then(extractMarkdownBlock)
//       .then((jsonTxt) => JSON.parse(jsonTxt) as Plan)
//       .then(wipAssForAiGenPlan)
//       .catch((error) => console.log("error", error))
//   )
// }

// function extractMarkdownBlock(content: string) {
//   // Regular expression to match content between ```json and ```
//   const jsonBlockRegex = /```markdown([\s\S]*?)```/
//   const match = content.match(jsonBlockRegex)

//   if (match) {
//     return match[1].trim() // Return the matched JSON content, trimmed of whitespace
//   } else {
//     return "" // Return an empty string if no JSON block found
//   }
// }

// const genPromptForSlides = (initInfo: MinimalCreatePlanFields) => `
// Please generate markdown that follows marp syntax (https://marpit.marp.app/markdown)

// topic: agile
// content: agile history, agile industry, agile current status
// requirements: no image, just text
// `

// const genPromptForSlides = (initInfo: MinimalCreatePlanFields) => `
// Please generate markdown that follows marp syntax (https://marpit.marp.app/markdown)

// topic: agile
// content: agile history, agile industry, agile current status
// requirements: no image, just text
// `
