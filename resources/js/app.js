import sys from './system';
window.sys = sys

window.onload = () => {
    sys.app_loaded();
}

window.app = {
    test: function(){
        var req = {
            action:'get_test'
        };
        sys.post(RS+'ajax',req,'json').then(x=>{
            console.log(x);
        });
    }
}