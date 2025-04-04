
import * as XLSX from 'xlsx';

// These should match the job creation schema requirements
export const generateJobTemplateExcel = () => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Create sheet with instructions
  const instructionsData = [
    ['Job Template Instructions'],
    [''],
    ['1. Fill in all required fields (marked with *)'],
    ['2. Save this Excel file'],
    ['3. Upload the file in the Job Creation -> Bulk Upload section'],
    [''],
    ['Notes:'],
    ['- Do not modify the column headers'],
    ['- Vehicle Types should be comma-separated (e.g., "Semi Truck, Box Truck")'],
    ['- Salary should be numeric values only'],
    ['- Dates should be in MM/DD/YYYY format'],
  ];
  
  const instructionsSheet = XLSX.utils.aoa_to_sheet(instructionsData);
  XLSX.utils.book_append_sheet(wb, instructionsSheet, 'Instructions');
  
  // Create the template with required headers
  const headers = [
    'Job Title*',
    'Location*',
    'Job Type*',
    'Employment Type*',
    'Vehicle Types*',
    'Driving Experience (years)*',
    'Salary Min',
    'Salary Max',
    'Description*',
    'Requirements*',
    'Benefits',
    'Application Deadline (MM/DD/YYYY)',
    'Start Date (MM/DD/YYYY)'
  ];
  
  // Example data row
  const exampleRow = [
    'CDL Class A Driver',
    'Los Angeles, CA',
    'full-time', // Must be one of: full-time, part-time, contract, temporary
    'permanent', // Must be one of: permanent, temporary, seasonal, internship
    'Semi Truck, Refrigerated Truck',
    '2',
    '60000',
    '75000',
    'We are looking for experienced CDL drivers to join our team...',
    'CDL Class A, 2+ years experience, clean driving record',
    'Health insurance, 401k, paid time off',
    '12/31/2025',
    '01/15/2026'
  ];
  
  // Create the main template sheet
  const templateData = [headers, exampleRow];
  const templateSheet = XLSX.utils.aoa_to_sheet(templateData);
  
  // Add column widths
  const wscols = headers.map(() => ({ wch: 20 }));
  templateSheet['!cols'] = wscols;
  
  XLSX.utils.book_append_sheet(wb, templateSheet, 'Jobs');
  
  // Add data validation information in the 3rd sheet as reference
  const validationData = [
    ['Field', 'Valid Values/Format'],
    ['Job Type', 'Must be one of: full-time, part-time, contract, temporary'],
    ['Employment Type', 'Must be one of: permanent, temporary, seasonal, internship'],
    ['Vehicle Types', 'Comma-separated list of vehicle types (e.g., "Semi Truck, Box Truck")'],
    ['Driving Experience', 'Numeric value in years (e.g., "3")'],
    ['Salary', 'Numeric values only'],
    ['Dates', 'MM/DD/YYYY format']
  ];
  
  const validationSheet = XLSX.utils.aoa_to_sheet(validationData);
  XLSX.utils.book_append_sheet(wb, validationSheet, 'Validation Rules');
  
  // Generate the Excel file and trigger download
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
  // Convert to ArrayBuffer
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
  
  // Return the workbook
  return s2ab(wbout);
};

export const downloadExcelTemplate = () => {
  const buffer = generateJobTemplateExcel();
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'job_posting_template.xlsx';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
