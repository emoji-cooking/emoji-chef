//should return a canvas element
const resizeImage = (imgElement: HTMLImageElement, targetWidth: number = 64): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement  = document.createElement('canvas');
    const ctx: (CanvasRenderingContext2D | null) = canvas.getContext('2d');
    const aspect: number = imgElement.width/imgElement.height;

    canvas.width = targetWidth;
    canvas.height = targetWidth / aspect;

    ctx?.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    return canvas;
}


// when clicking merged emoji, parse through event target to find image file
// then on click convert png to dataURL
const writetoClipboard = async (image) => {
    const emoji = await fetch(image).then(r => r.blob());
    const dataUrl : Promise = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(emoji);
      });
    
    const imageEl : HTMLImageElement = document.createElement('img');
    imageEl.src = dataUrl;
    
    const canvas: HTMLCanvasElement = resizeImage(imageEl);
    //write blob to clipboard
}

document.addEventListener('mergedEmojiClicked', (e) => {
  // writetoClipboard(e.target.image)
})


//resize image to a canvas using drawImage
//convert canvas to blob
//copy blob to clipboard
// canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))

//convert target png to uri
//create new img element
//point that img element to the png uri (src)
//pass that img element into our resize function




