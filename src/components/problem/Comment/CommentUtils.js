export const pageSize = 5;

export function getCommentPageNum(commentId, data){
    let index = data.findIndex((value)=>value.id == commentId);
    return index != -1 ? Math.ceil((index + 1) / pageSize) : 1;
}

export function focusComment(commentId){
    debugger
    let selector = `#comment-${commentId}`;

    let ele = document.querySelector(selector);
    if(ele){
        ele.scrollIntoView();
    }
}

export function actionsProcess( commentId, action, data ){
    let result_data = null, focus_id = null;
    switch(action){
        case 'sub_comment':{
            let isActive, id;
            let temp = data.map((value)=>{
                if(value.id == commentId){
                    isActive = value.sub_comment_active;
                    id = value.id
                    return {...value, sub_comment_active: !isActive}
                }
                
                return value;
            })
            result_data = temp;
            focus_id = id ? focusComment(id) : null;
            break;
        }
        case 'reply':{
            let temp = data.map((value=>(
                value.id == commentId ? {...value, reply_active: !value.reply_active} : value
            )))
            result_data = temp;
            break;
        }
            
    }

    return {result_data, focus_id};
}