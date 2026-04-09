function downloadImage(img) {
    const rawName = new URL(img.src).pathname.split("/").pop();
    const fileName = decodeURIComponent(rawName);
    const link = document.createElement("a");
    link.href = img.src;
    link.download = fileName;
    link.click();
}

function getImageName(img) {
    return img.substring(0, img.lastIndexOf("."));
}
