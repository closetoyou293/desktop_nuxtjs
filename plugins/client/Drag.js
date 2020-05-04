import Vue from 'vue'

var targetDrag = null;
var targetHiddenBox = null;

//MainDrag
export function Run(e){
    e.preventDefault();
    let target = $(e.target);
    //Nếu không có targetDrag
    if(!targetDrag) return false;

    //Nếu targetDrag là AppIcon
    if(targetDrag[0].selectAppIcon){
        checkMove_AppIcon(target)
    }

    Move(e)
}
export function End(){
    if(!targetDrag) return false;

    if(targetDrag[0].selectBox) return checkDragEnd_Box();
    
    if(targetDrag[0].selectAppIcon) return checkDragEnd_AppIcon();
}
function Move(e){
    targetDrag[0].EndTop = targetDrag[0].offsetTop - (targetDrag[0].posY - e.clientY);
    targetDrag[0].EndLeft = targetDrag[0].offsetLeft - (targetDrag[0].posX - e.clientX);
    targetDrag[0].posX = e.clientX;
    targetDrag[0].posY = e.clientY;

    let MaxTop = (window.innerHeight - targetDrag[0].offsetHeight)
    let MaxLeft = (window.innerWidth - targetDrag[0].offsetWidth) - 45
    
    targetDrag[0].EndTop = targetDrag[0].EndTop > MaxTop ? MaxTop : targetDrag[0].EndTop
    targetDrag[0].EndTop = targetDrag[0].EndTop < 0 ? 0 : targetDrag[0].EndTop
    targetDrag[0].EndLeft = targetDrag[0].EndLeft > MaxLeft ? MaxLeft : targetDrag[0].EndLeft
    targetDrag[0].EndLeft = targetDrag[0].EndLeft < 0 ? 0 : targetDrag[0].EndLeft

    targetDrag.css({ top: targetDrag[0].EndTop, left: targetDrag[0].EndLeft })
}

//Box
export function BoxStart(e){
    e.preventDefault();

    //Nếu phần tử Target ko phải Box_Bar
    if(!$(e.target)[0].isBarDrag) return false

    //Lấy phần tử cha Box
    let GetParent = $(e.target).parents(".Box");
    //Nếu phần tử Cha không tồn tại
    if(GetParent.length < 1) return false;
    //Nếu phần tử cha Box đang ở chế độ Zoom
    if(GetParent[0].isZoom) return false
    
    //Nếu thỏa mãn, gán biến toàn cầu targetDrag
    targetDrag = GetParent;
    targetDrag[0].selectBox = true;
    targetDrag[0].posX = e.clientX;
    targetDrag[0].posY = e.clientY;
}
function checkDragEnd_Box(){
    //Lưu tọa độ mới vào LocalStore cho Box
    let New = {
        top: targetDrag[0].EndTop,
        left: targetDrag[0].EndLeft
    }
    Vue.prototype.$ClientData.Save('BoxPostion', targetDrag[0].id, New)

    //Bỏ Select Box
    targetDrag[0].selectBox = false;

    //Reset dữ liệu gốc
    targetDrag = null;
}

//AppIcon
export function AppIconStart(e){
    e.preventDefault();
    //Nếu phần tử Target ko phải Icon
    if(!$(e.target)[0].isAppIconDrag) return false

    //Lấy phần tử cha AppIcon
    let GetParent = $(e.target).parents(".AppIcon");
    //Nếu phần tử Cha không tồn tại
    if(GetParent.length < 1) return false;

    //Nếu thỏa mãn, gán biến toàn cầu targetDrag
    targetDrag = GetParent;
    targetDrag[0].selectAppIcon = true;
    targetDrag[0].posX = e.clientX;
    targetDrag[0].posY = e.clientY;

    //Hiện tất cả HiddenBox lên đầu
    $('.Main').find('.HiddenBoxItem').css({"z-index": "999"})
}
function checkMove_AppIcon(target){
    if(target[0].isHiddenBox){
        targetHiddenBox = target
        targetHiddenBox.css({opacity: 1});
        targetHiddenBox[0].isShow = true;
    }  

    //Hiển thị cho targetDrag
    //if(targetDrag[0].isChangeCss) return false;
    //targetDrag[0].isChangeCss = true;
    //targetDrag.addClass('Layer');
}
function checkDragEnd_AppIcon(){
    //Ẩn xuống tất cả HiddenBox
    $('.Main').find('.HiddenBoxItem').css({"z-index": "0"});

    //Nếu không tồn tại targetHiddenBox
    if(!targetHiddenBox) return targetDrag = null;

    //Check Tạo Độ Mới đã có AppIcon nào chưa
    let AppIcon = Vue.prototype.$ClientData.Get('AppIconPostion');
    let isDupe = false;
    for (const key in AppIcon) {
        if(AppIcon[key].in == targetHiddenBox[0].id){
            isDupe = true;
        }
    }

    //Lưu tọa độ mới vào LocalStore
    let New = {
        top: isDupe ? AppIcon[targetDrag[0].id].top : targetHiddenBox[0].offsetTop,
        left: isDupe ? AppIcon[targetDrag[0].id].left : targetHiddenBox[0].offsetLeft,
        in: isDupe ? AppIcon[targetDrag[0].id].in : targetHiddenBox[0].id
    }
    Vue.prototype.$ClientData.Save('AppIconPostion', targetDrag[0].id, New);

    //Set css mới cho targetDrag
    //targetDrag[0].isChangeCss = false;
    //targetDrag.removeClass('Layer');
    targetDrag.css({ top: New.top, left: New.left});

    //Bỏ Select AppIcon
    targetDrag[0].selectAppIcon = false;

    //Reset dữ liệu gốc
    targetHiddenBox = null;
    targetDrag = null;
}

