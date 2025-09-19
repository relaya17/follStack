// Simple PDF export using built-in browser print functionality
// This creates a print-friendly version that can be saved as PDF

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the HTML file
const htmlPath = path.join(__dirname, "index.html");
const htmlContent = fs.readFileSync(htmlPath, "utf8");

// Create a print-friendly version
const printHtml = htmlContent
  .replace(
    '<link rel="stylesheet" href="styles.css" />',
    `
    <style>
      @media print {
        body { 
          background: white !important; 
          color: black !important; 
          font-family: Arial, sans-serif;
        }
        .container { max-width: none; margin: 0; padding: 20px; }
        section { 
          background: white !important; 
          border: 1px solid #ccc; 
          margin: 10px 0; 
          padding: 15px; 
          page-break-inside: avoid;
        }
        pre { 
          background: #f5f5f5 !important; 
          border: 1px solid #ddd; 
          padding: 10px; 
          font-size: 12px;
        }
        button { display: none; }
        .grid { display: none; }
        h1, h2 { color: black !important; }
        .muted { color: #666 !important; }
      }
    </style>
  `
  )
  .replace(
    "</head>",
    `
    <script>
      window.onload = function() {
        // Auto-print when loaded
        setTimeout(() => {
          window.print();
        }, 1000);
      };
    </script>
  </head>`
  );

// Write the print version
const printPath = path.join(__dirname, "print-version.html");
fs.writeFileSync(printPath, printHtml);

console.log("✅ Print-friendly version created: print-version.html");
console.log("📖 Open this file in your browser and use Ctrl+P to save as PDF");
console.log("🎯 Or use: start print-version.html");
