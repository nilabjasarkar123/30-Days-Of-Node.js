function resolvePath(relativePath) {
    // Implementation
    const path = require('node:path'); 
    path1 = path.resolve(relativePath);
    console.log("Resolved Path: ",path1)
  
}
resolvePath('../project/folder/file.txt');
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

 resolvePath('nonexistent-folder/file.txt');
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt