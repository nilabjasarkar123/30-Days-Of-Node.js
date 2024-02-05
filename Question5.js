function checkFileExtension(filePath, expectedExtension) {
    const fs = require("fs");
    if (fs.existsSync(filePath,expectedExtension)){
        console.log("File has the expected extension:", expectedExtension);
    }
    else {
        const actual = filePath.split('.').pop();
        console.log("File does not have the expected extension. Expected: "+expectedExtension+" Actual: ."+actual);
    }
}

checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png