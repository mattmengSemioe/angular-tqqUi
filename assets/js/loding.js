/**
 * Created by Administrator on 2016/4/2.
 */
dir.factory('loading',function(){
    var monitor=true;
    var style=''
    return {
        show:function(code){

            if(monitor){
                var loadingBody = document.createElement('section');
                 loadingBody.className = 'load-box';
                 document.body.style.overflowY='hidden'
                console.log(document.body)
                document.body.appendChild(loadingBody);
                document.getElementsByClassName('load-box')[0].innerHTML=' <div class="load-container"><div class="loader"><div class="loader-inner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>'
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