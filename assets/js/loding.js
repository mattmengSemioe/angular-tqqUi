/**
 * Created by Administrator on 2016/4/2.
 */
dir.factory('loading',function(){
    var monitor=true;
    var style=''
    return {
        show:function(code){
            switch(code){
                case 'two':style='ball-clip-rotate-multiple-two';
                    break;
                case 'three':style='ball-clip-rotate-multiple-three';
                    break;
                default:style="ball-clip-rotate-multiple";
            }
            if(monitor){
                var loadingBody = document.createElement('section');
                 loadingBody.className = 'load-box';
                 document.body.style.overflowY='hidden'
                console.log(document.body)
                document.body.appendChild(loadingBody);
                document.getElementsByClassName('load-box')[0].innerHTML='<div class="load-container"><div class="'+style+'"></div>'
                monitor=false;
            }
        },
        hide:function(){
            var del=document.getElementsByClassName('load-box')[0];
            if(del){
                document.body.removeChild(del)
                document.body.style.overflowY='auto'
                monitor=true;
                return;
            };
        },
    };
});