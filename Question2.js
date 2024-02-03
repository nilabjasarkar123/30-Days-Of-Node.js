function writeToFile(filePath, content) {
    const fs = require('node:fs');
    
    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(err);
        } 
        else {
            console.log(content);
        }
    });
}

writeToFile('test-files/output1.txt', 'Sample content.');
// Expected Output: Data written to output1.txt

//writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...