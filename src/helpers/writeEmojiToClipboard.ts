//should return a canvas element
export const resizeImage = (imgElement: HTMLImageElement, targetWidth: number = 32): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement  = document.createElement('canvas');
  const ctx: (CanvasRenderingContext2D | null) = canvas.getContext('2d')

  canvas.width = targetWidth;
  canvas.height = targetWidth;
  ctx?.drawImage(imgElement, 0, 0, 32, 32);   

  return canvas;
}


// when clicking merged emoji, parse through event target to find image file (blob)
// then on click convert png to dataURL
export const writetoClipboard = async (url: string) => {
    // const emoji = await fetch(url, {
    //   headers: {
    //     'Access-Control-Allow-Origin':'*',
    //   }
    // }).then(r => r.blob());
    // // const emoji = image.blob();
    // const dataUrl: string = await new Promise(resolve => {
    //     let reader = new FileReader();
    //     reader.onload = () => resolve(reader.result as string);
    //     reader.readAsDataURL(emoji); //this converts the blob to data URI
    //   });

    
    const imageEl : HTMLImageElement = document.createElement('img');
    // imageEl.setAttribute('crossorigin', 'anonymous');
    imageEl.setAttribute('crossorigin', 'anonymous');
    imageEl.src = 'https://cors-anywhere.herokuapp.com/' + url;
    // imageEl.src = url;
    
    console.log('imageEl.src is ', imageEl.src);
    
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




