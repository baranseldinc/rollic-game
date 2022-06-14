const FileHandler = () => {
    const getBase64Data = (uploadedFile, callback) => {
        const file = uploadedFile.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const data = reader.result;
            callback(data);
        }
    }

    return {
        getData: getBase64Data
    }
}
export default FileHandler;