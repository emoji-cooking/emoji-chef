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


// when clicking merged emoji, parse through event target to find image file (blob)
// then on click convert png to dataURL
const writetoClipboard = async (image: URL) => {
    const emoji = await fetch(image).then(r => r.blob());
    const dataUrl: string = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(emoji); //this converts the blob to data URI
      });
    
    const imageEl : HTMLImageElement = document.createElement('img');
    imageEl.src = dataUrl;
    
    //this will return an canvas element
    const canvas: HTMLCanvasElement = resizeImage(imageEl);

    canvas.toBlob(async (blob) => {
      //checking for null or else typescript yells at us
      if (blob) await navigator.clipboard.write([new ClipboardItem({'image/png': blob})])
    });
}

document.addEventListener('mergedEmojiClicked', (e) => {
  // writetoClipboard(e.target.image)
}) 



//resize image to a canvas using drawImage
//convert canvas to blob
//copy blob to clipboard

//convert target png to uri
//create new img element
//point that img element to the png uri (src)
//pass that img element into our resize function




