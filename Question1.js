/**
 * 
 *roblem 1: File Reader
Problem Statement: Create a function readFileContent(filePath) that takes the path to a file as input and reads its content asynchronously using the fs module. The function should print the content to the console.

Function Signature:

function readFileContent(filePath) {
    // Implementation
}
Expected Output:

File Content:
This is the content of the file.
Hello, Node.js!
Test Cases:

readFileContent('test-files/file1.txt');
// Expected Output: Content of file1.txt

readFileContent('test-files/empty-file.txt');
// Expected Output: (empty string)

readFileContent('test-files/nonexistent-file.txt');
// Expected Output: Error reading file: ENOENT: no such file or directory...
 */
function readFileContent(filePath) {
    const fs = require('fs');
    fs.readFile(filePath, "utf-8", (err, result) => {
        if(err) {
            console.log("Error reading file: ENOENT: no such file or directory..", err);
        }
        else {
            console.log(result);
        }
    })
}

 readFileContent('test-files/file1.txt');
// Expected Output: Content of file1.txt

 readFileContent('test-files/empty-file.txt');
// Expected Output: (empty string)

 readFileContent('test-files/nonexistent-file.txt');
// Expected Output: Error reading file: ENOENT: no such file or directory..