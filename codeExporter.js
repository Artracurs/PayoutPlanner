const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const directoryPath = path.resolve('./'); // Получаем абсолютный путь к вашей директории
const outputFile = path.resolve('./exported.txt'); // Получаем абсолютный путь к файлу, в который будете копировать содержимое

// Список игнорируемых файлов и папок
const ignoreList = ['node_modules', '.git', '.gitignore', '.env', 'LICENSE', 'README.md', 'package-lock.json', 'codeExporter.js'];

// Функция для записи содержимого файла в выходной файл
function appendFileContent(sourcePath, outputFile) {
    const relativePath = path.relative(directoryPath, sourcePath); // Получаем относительный путь файла
    const content = fs.readFileSync(sourcePath, 'utf8');
    fs.appendFileSync(outputFile, `Файл: ${relativePath}\n${content}\n\n`, 'utf8');
}

// Рекурсивная функция для обхода директории
function readDirectory(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    files.forEach(file => {
        if (ignoreList.includes(file.name)) {
            return; // Пропускаем файлы и папки из списка игнорирования
        }
        const filePath = path.join(directory, file.name);
        if (file.isDirectory()) {
            readDirectory(filePath); // Если это директория, рекурсивно вызываем функцию
        } else {
            appendFileContent(filePath, outputFile); // Если это файл, добавляем его содержимое
        }
    });
}

// Функция для копирования содержимого файла в буфер обмена
function copyToClipboard(file) {
    exec(`cat ${file} | xclip -selection clipboard`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Ошибка копирования: ${error}`);
            return;
        }
        console.log('Содержимое файла скопировано в буфер обмена');
    });
}

// Удаление выходного файла, если он существует, для очистки перед новым запуском
if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
}

// Начинаем чтение с корневой директории и копирование в буфер обмена
readDirectory(directoryPath);
copyToClipboard(outputFile);

console.log('Содержимое всех файлов было скопировано в', outputFile);
