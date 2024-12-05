declare module "html2pdf.js" {
  // eslint-disable-next-line
  function html2pdf(): any
  export = html2pdf
}

interface Window {
  queryLocalFonts: () => Promise<FontData[]>
}
