import Vue from 'vue'

//Zoom------------------------------------------
export function ZoomIn(e, boxID){
    e.preventDefault();
    let eleBox = $(e.target).parents(".Box");

    //Nếu không tồn tại
    if(eleBox.length < 1) return false;
    if(!boxID) return false;

    //Nếu đang trong trạng thái phóng to thì thu nhỏ
    if(eleBox[0].isZoom){
        //Lấy tạo độ cũ của Box
        let Postion = Vue.prototype.$ClientData.Get("BoxPostion", boxID)

        //Set Css của App
        eleBox.find('.App').removeClass('Max-Box');

        //Animtion
        if(Vue.prototype.$GetTheme.effect){
            eleBox.animate({
                top: Postion.top, 
                left: Postion.left,
                width: eleBox[0].oldWidth, 
                height: eleBox[0].oldHeight
            }, 200);
        } else {
            eleBox.css({
                top: Postion.top, 
                left: Postion.left,
                width: eleBox[0].oldWidth, 
                height: eleBox[0].oldHeight
            }, 200);
        }

        eleBox.removeClass("Z-index");

        //Thu nhỏ
        eleBox[0].isZoom = false;
    }

    //Nếu đang trong trạng thái thu nhỏ thì phóng to
    else {
        //Set Css của App
        eleBox.find('.App').addClass('Max-Box');

        //Animiton
        if(Vue.prototype.$GetTheme.effect){
            eleBox.animate({
                top: 0, left: 0,
                width: window.innerWidth, height: window.innerHeight
            }, 200);
        } else {
            eleBox.css({
                top: 0, left: 0,
                width: window.innerWidth, height: window.innerHeight
            }, 200);
        }

        eleBox.addClass("Z-index");

        //Phóng to
        eleBox[0].isZoom = true;
    }
}

export function ZoomOut(e, store, boxID){
    e.preventDefault();
    let eleBox = $(e.target).parents(".Box");

    //Nếu không tồn tại
    if(eleBox.length < 1) return false;
    if(!boxID) return false;
    if(!store) return false;

    //Nếu đang trong trang thái MiniBox
    if(eleBox[0].isMiniBox) return false;

    //Store Add Box Mini 
    store.commit("box/addMini", store.state.box.List[boxID]);

    //Animation
    if(Vue.prototype.$GetTheme.effect){
        eleBox.animate({
            top: 45, left: 0,
            width: 0, height: 0
        }, 200);
    } else {
        eleBox.css({
            top: 45, left: 0,
            width: 0, height: 0
        }, 200);
    }

    //MiniBox
    eleBox[0].isMiniBox = true;
}

export function ZoomInByMini(e, store, boxID){
    e.preventDefault();
    let eleBox = $('#'+boxID);

    //Nếu không tồn tại
    if(eleBox.length < 1) return false;
    if(!boxID) return false;
    if(!store) return false;

    //Nếu đang trong trang thái Mở
    if(!eleBox[0].isMiniBox) return false;

    //Store Remove Box Mini 
    store.commit("box/removeMini", boxID);

    //Lấy tạo độ cũ của Box
    let Postion = Vue.prototype.$ClientData.Get("BoxPostion", boxID)

    //Animation
    if(Vue.prototype.$GetTheme.effect){
        eleBox.animate({
            top: eleBox[0].isZoom ? 0 : Postion.top, //Nếu Box gốc = Zoom => top = 0
            left: eleBox[0].isZoom ? 0 : Postion.left, //Nếu Box gốc = Zoom => left = 0
            width: eleBox[0].isZoom ? '100%' : eleBox[0].oldWidth,
            height: eleBox[0].isZoom ? '100%' : eleBox[0].oldHeight
        }, 200);
    } else {
        eleBox.css({
            top: eleBox[0].isZoom ? 0 : Postion.top, //Nếu Box gốc = Zoom => top = 0
            left: eleBox[0].isZoom ? 0 : Postion.left, //Nếu Box gốc = Zoom => left = 0
            width: eleBox[0].isZoom ? '100%' : eleBox[0].oldWidth,
            height: eleBox[0].isZoom ? '100%' : eleBox[0].oldHeight
        }, 200);
    }
  
    //Mở Box
    eleBox[0].isMiniBox= false;
}

//Close------------------------------------------
export function Close(e, store, boxID){
    e.preventDefault();
    let eleBox = $(e.target).parents(".Box");

    //Nếu không tồn tại
    if(eleBox.length < 1) return false;
    if(!boxID) return false;
    if(!store) return false;

    if(Vue.prototype.$GetTheme.effect){
        eleBox.animate({
            top: window.innerHeight, left: window.innerWidth,
            height: 'toggle', width: 'toggle'
        }, 200);

        setTimeout(function(){  
            Vue.prototype.$ClientData.Remove("BoxPostion", boxID); 
            store.commit('box/remove', boxID);
        }, 300);

        if(eleBox[0].onClose) return eleBox[0].onClose();
    }
    
    Vue.prototype.$ClientData.Remove("BoxPostion", boxID); 
    store.commit('box/remove', boxID);
    if(eleBox[0].onClose) return eleBox[0].onClose();
}

//SetCss
export function Set(boxID){
    let Box = $('#'+boxID);
    let App = $('#'+boxID).find('.App');

    //App.css({'max-height': window.innerHeight * (80/100)});

    Box[0].oldWidth = Box[0].offsetWidth;
    Box[0].oldHeight = App[0].offsetHeight + 30;

    Box.css({
        width: Box[0].oldWidth, 
        height: Box[0].oldHeight,
        left: ((window.innerWidth - 45) / 2) - (Box[0].oldWidth / 2),
        top: window.innerHeight / 2 - (Box[0].oldHeight / 2),
        transform: 'scale3d(1, 1, 1)'
    })

    Vue.prototype.$ClientData.Save("BoxPostion", boxID, {
        top: Box[0].offsetTop, 
        left: Box[0].offsetLeft
    });
}

export function Change(boxID){
    let Box = $("#"+boxID);
    
    setTimeout(() => {
        if(Box[0].isZoom) return false;

        Box.css({height: 'auto', width: 'auto'});
        Box[0].oldWidth = Box[0].offsetWidth;
        Box[0].oldHeight = Box[0].offsetHeight;

        Box.css({
            width: Box[0].oldWidth,
            height: Box[0].oldHeight,
            left: ((window.innerWidth - 45) / 2) - (Box[0].oldWidth / 2),
            top: window.innerHeight / 2 - (Box[0].oldHeight / 2),
        });

        Vue.prototype.$ClientData.Save("BoxPostion", boxID, {
            top: Box[0].offsetTop, 
            left: Box[0].offsetLeft
        });
    }, 600);
}