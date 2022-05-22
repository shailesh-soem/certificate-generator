const generatePDF = async (name)=> {
    const {PDFDocument, rgb } = PDFLib;

    const exBytes = await fetch("./certificate.pdf").then((res)=>
    {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./Sanchez-Regular.ttf").then(res =>
        {
            return res.arrayBuffer();
        });

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(name, {
        x: 55,
        y: 310,
        size: 40,
        font: myFont,
        color: rgb(0,0.5,1)
    })
    
    const uri = await pdfDoc.saveAsBase64({dataUri: true})
    saveAs(uri, "certificate.pdf", { autoBom: true })
 };

const submitBtn = document.getElementById("submit");
const inputVal = document.querySelector("#name");

submitBtn.addEventListener("click", ()=>{
    const val = inputVal.value;
    generatePDF(val);
});