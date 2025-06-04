if(localStorage.getItem("basket") !== null){
    let basket= JSON.parse(localStorage.getItem("basket"));
    document.querySelector("main>div:first-child").innerHTML+=` (${basket.length})`;
    basket.forEach((e,i) => {
        let div0=document.createElement("div");
        let img=document.createElement("img");
        img.src=`/assets/images/${e.path}`;
        let span=document.createElement("span");
        span.classList.add("close");
        span.onclick=(sp)=>{
            sp.target.parentNode.style.display="none";
            basket.splice(i,1);
            document.querySelector("main>div:first-child").innerHTML=`سلتي (${basket.length})`;
            localStorage.setItem("basket",JSON.stringify(basket));
        };
        let title=document.createElement("div");
        title.classList.add("title");
        title.appendChild(document.createTextNode(e.name));
        let price=document.createElement("div");
        price.classList.add("price");
        price.appendChild(document.createTextNode(`${e.price} DH`));
        let adiv=document.createElement("div");
        let cs=document.createElement("div");
        let color=document.createElement("div");
        color.classList.add("color");
        color.style.backgroundColor=e.color;
        let size=document.createElement("div");
        size.classList.add("size");
        size.appendChild(document.createTextNode(e.size));
        cs.appendChild(color);
        cs.appendChild(size);
        div0.appendChild(span);
        div0.appendChild(img);
        adiv.appendChild(title);
        adiv.appendChild(price);
        adiv.appendChild(cs);
        div0.appendChild(adiv);
        document.querySelector("div.myp").appendChild(div0);
    });
}

document.querySelector("button.order").onclick=()=>{
    // alert("A");
    if(localStorage.getItem("basket") !== null){
        let basket= JSON.parse(localStorage.getItem("basket"));
        let st="";
        let pth="https://sokashop.github.io/assets/images/";
        basket.forEach((v,i)=>{
            if(i > 0)st+=`%0A_________________%0A`;
            st+=`
Name  : ${v.name}%0A
Price : ${v.price} DH%0A
Image : ${pth}${v.path}%0A
Color : ${v.color.replace("#","%23")}%0A
Size  : ${v.size}
            `;
        });
        let link=`https://wa.me/212698203145?text=${st}`;
        open(link);
    }
}

document.querySelector("footer div.copy").innerHTML=`&copy ${new Date().getFullYear()}`;
