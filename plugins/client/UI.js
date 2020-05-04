export function Message(text){
    let UIListMessage = $('.v-application').find('.UI_ListMessage')

    if(UIListMessage.length == 0){
        $('.v-application').append('<div class="UI_ListMessage"></div>')
        UIListMessage = $('.v-application').find('.UI_ListMessage')
    }

    UIListMessage.append(`
        <div class="UI_ListMessage_Item">
            <span>${text}<span>
        </div>`
    );

    let Length = $(UIListMessage.find('.UI_ListMessage_Item')).length;
    let Taget = $(UIListMessage.find('.UI_ListMessage_Item'))[Length - 1];
    
    let Show = setTimeout(()=> {
        $(Taget).toggleClass('UI_ListMessage_Item_Show');

        let Hide = setTimeout(()=> {
            $(Taget).toggleClass('UI_ListMessage_Item_Show')
            setTimeout(() => {
                $(Taget).remove();
    
                if($(UIListMessage.find('.UI_ListMessage_Item')).length < 1) return UIListMessage.remove()
            }, 500)
        }, 2500);
    }, 50);
}