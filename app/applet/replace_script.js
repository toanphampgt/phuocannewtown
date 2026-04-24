const fs = require('fs');

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace "text-base" with "text-[18px]" to specifically mean 18px (as text-lg is 1.125rem which is 18px, but text-[18px] guarantees it). Let's use text-lg which is natively 18px in Tailwind and looks better in class lists.
content = content.replace(/\btext-base\b/g, 'text-lg');

fs.writeFileSync(file, content);
console.log('Done!');
