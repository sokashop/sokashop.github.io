if(localStorage.getItem("basket") === null || JSON.parse(localStorage.getItem("basket")).length === 0){
    document.querySelector("div.basket div.bnumber").style.opacity="0";
}
else{
    document.querySelector("div.basket div.bnumber").innerHTML=JSON.parse(localStorage.getItem("basket")).length;
    document.querySelector("div.basket div.bnumber").style.opacity="1";
}
document.querySelector("div.viewP div.close").onclick=(el)=>{
    el.target.parentNode.parentNode.style.display="none";
        document.body.style.overflowY="scroll";
};

let pAr=[];
fetch("/assets/p.json")
    .then((res)=>res.json())
    .then((data)=>{
        pAr=data;
        pAr.forEach((p,i)=>{
            let div0=document.createElement("div");
            div0.classList.add("prod");
            let img=document.createElement("img");
            img.src=`/assets/images/${p.path[0]}`;
            img.alt=p.name;
            let div1=document.createElement("div");
            div1.classList.add("title");
            div1.appendChild(document.createTextNode(p.name));
            let div2=document.createElement("div");
            div2.classList.add("price");
            div2.appendChild(document.createTextNode(`${p.price} DH`));
            div0.appendChild(img);
            div0.appendChild(div1);
            div0.appendChild(div2);
            div0.onclick=function(){
                let btAr={};
                // document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
                // setTimeout(window.scrollTo(1,1),0);
                document.querySelector("div.viewP div.addbtn").style.opacity=".5";        
                document.querySelector("div.viewP div.addbtn").style.cursor="not-allowed";                
                document.querySelector("div.viewP").style.display="flex";
                document.querySelector("div.viewP").setAttribute("pi",i);
                document.querySelector("div.viewP").setAttribute("index",0);
                document.querySelector("div.viewP img").src=`/assets/images/${p.path[0]}`;
                if(p.path.length <= 1){
                    document.querySelector("div.viewP div.left").style.display="none";
                    document.querySelector("div.viewP div.right").style.display="none";
                }
                else{
                    document.querySelector("div.viewP div.left").style.display="flex";
                    document.querySelector("div.viewP div.right").style.display="flex";
                }
                document.querySelector("div.viewP div.t").innerHTML=p.name;
                document.querySelector("div.viewP div.p").innerHTML=`${p.price} DH`;
                document.querySelector("div.viewP div.colors").innerHTML="";
                p.colors.forEach((c)=>{
                    let spanc=document.createElement("span");
                    spanc.style.backgroundColor=c;
                    spanc.onclick=()=>{
                        btAr.color=c;
                        document.querySelectorAll("div.viewP div.colors span").forEach((el)=>{
                            el.style.opacity=".5";
                        });
                        spanc.style.opacity="1";
                        if (Object.keys(btAr).length >= 2){
                            document.querySelector("div.viewP div.addbtn").style.opacity="1";
                            document.querySelector("div.viewP div.addbtn").style.cursor="pointer";  
                        }
                    };
                    document.querySelector("div.viewP div.colors").appendChild(spanc);
                });
                document.querySelector("div.viewP div.sizes").innerHTML="";
                p.sizes.forEach((s)=>{
                    let spans=document.createElement("span");
                    spans.appendChild(document.createTextNode(s));
                    spans.onclick=()=>{
                        btAr.size=s;
                        document.querySelectorAll("div.viewP div.sizes span").forEach((el)=>{
                            el.style.textDecoration="none";
                        });
                        spans.style.textDecoration="line-through";
                        if (Object.keys(btAr).length >= 2){
                            document.querySelector("div.viewP div.addbtn").style.opacity="1";
                            document.querySelector("div.viewP div.addbtn").style.cursor="pointer";
                        }
                    };
                    document.querySelector("div.viewP div.sizes").appendChild(spans);
                });
                
                document.querySelector("div.viewP div.addbtn").onclick=(btn)=>{
                    if(btn.target.style.opacity === "1"){
                        if(localStorage.getItem("basket") === null){
                            localStorage.setItem("basket",JSON.stringify([{name:p.name,price:p.price,path:p.path,color:btAr.color,size:btAr.size}]));
                            document.querySelector("div.basket div.bnumber").innerHTML= "1";
                        }
                        else{
                            let baskett=JSON.parse(localStorage.getItem("basket"));
                            baskett.push({name:p.name,price:p.price,path:p.path,color:btAr.color,size:btAr.size});
                            localStorage.setItem("basket",JSON.stringify(baskett));
                            document.querySelector("div.basket div.bnumber").innerHTML=baskett.length;
                        }
                        document.querySelector("div.basket div.bnumber").style.opacity="1";
                        document.querySelectorAll("div.viewP div.sizes span").forEach((el)=>{
                                el.style.textDecoration="none";
                            });
                        document.querySelectorAll("div.viewP div.colors span").forEach((el)=>{
                                el.style.opacity=".5";
                            });
                        btn.target.style.opacity=".5";
                        btn.target.style.cursor="not-allowed";
                        btAr={};
                    }
                };
                document.body.style.overflowY="hidden";
            };
            document.querySelector("div.product").appendChild(div0)
        })
    });

document.querySelector("footer div.copy").innerHTML=`&copy ${new Date().getFullYear()}`;

document.querySelector("div.viewP div.left").onclick=(e)=>{
    let pi=parseInt(e.target.parentNode.parentNode.parentNode.getAttribute("pi")),index=parseInt(e.target.parentNode.parentNode.parentNode.getAttribute("index"));
    if(index === 0)
        index=pAr[pi].path.length-1;
    else 
        index--;
    document.querySelector("div.viewP img").src=`/assets/images/${pAr[pi].path[index]}`;
    e.target.parentNode.parentNode.parentNode.setAttribute("index",index);
};

document.querySelector("div.viewP div.right").onclick=(e)=>{
    let pi=parseInt(e.target.parentNode.parentNode.parentNode.getAttribute("pi")),index=parseInt(e.target.parentNode.parentNode.parentNode.getAttribute("index"));
    if(index === pAr[pi].path.length-1)
        index=0;
    else 
        index++;
    document.querySelector("div.viewP img").src=`/assets/images/${pAr[pi].path[index]}`;
    e.target.parentNode.parentNode.parentNode.setAttribute("index",index);
};