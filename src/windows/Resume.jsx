import WindowControllers from '#components/windowControllers'
import WindoWrapper from '#hoc/WindoWrapper'
import { Download } from 'lucide-react'
import React from 'react'
import {Document,Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
    return (
      <>
        <div id="window-header">
          <WindowControllers target="resume" />
          <h2>Resume.pdf</h2>
          <a
            href="files/resume.pdf"
            downlaod
            className="cursor-pointer"
            title="Download resume"
          >
            <Download className="icon" />
          </a>
        </div>
        <Document file="files/resume.pdf" renderTextLayer renderAnnotationLayer>
          <Page pageNumber={1} />
        </Document>
      </>
    );
}
const ResumeWindow = WindoWrapper(Resume, 'resume')

export default ResumeWindow