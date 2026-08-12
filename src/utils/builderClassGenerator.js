export function generateBuilderClass(stack) {
  if (!stack || stack.trim() === '') return "Hacker House Resident";
  
  const keywords = stack.toLowerCase();
  
  if (keywords.includes('react') || keywords.includes('vue') || keywords.includes('frontend') || keywords.includes('next') || keywords.includes('tailwind')) {
    return "Frontend Alchemist";
  }
  if (keywords.includes('rust') || keywords.includes('solidity') || keywords.includes('web3') || keywords.includes('crypto') || keywords.includes('contract')) {
    return "Protocol Whisperer";
  }
  if (keywords.includes('node') || keywords.includes('backend') || keywords.includes('python') || keywords.includes('go') || keywords.includes('java')) {
    return "Backend Ninja";
  }
  if (keywords.includes('fullstack') || keywords.includes('mern') || keywords.includes('mean')) {
    return "Fullstack Nomad";
  }
  if (keywords.includes('design') || keywords.includes('figma') || keywords.includes('ui') || keywords.includes('ux')) {
    return "Pixel Virtuoso";
  }
  if (keywords.includes('data') || keywords.includes('ml') || keywords.includes('ai') || keywords.includes('machine learning')) {
    return "Data Sorcerer";
  }
  
  return "Hacker House Resident";
}
