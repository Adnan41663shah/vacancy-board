export const formatJobDescription = (description) => {
  if (!description) return '';
  
  // Replace line breaks with <br> tags
  let formatted = description.replace(/\n/g, '<br>');
  
  // Format bullet points (lines starting with - or *)
  formatted = formatted.replace(/^- (.+)/gm, '<li>$1</li>');
  formatted = formatted.replace(/^\* (.+)/gm, '<li>$1</li>');
  
  // Wrap lists in <ul> tags
  if (formatted.includes('<li>')) {
    formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  }
  
  // Bold text between ** or __
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  return formatted;
};

