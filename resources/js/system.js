export default {
    image_preview(e, container, self){
        var container = container || {};
        var e = e || {};
        if(e && container){
            for (var i = 0; i < e.srcElement.files.length; i++) {
                var file = e.srcElement.files[i];
                var reader = new FileReader();
                var img = $(container).find('img')[0];
                reader.onloadend = () => img.src = reader.result;
                reader.readAsDataURL(file);            
            }
        }
    },
    get_uploaded_name (self, target, mult){
        var mult = mult || false;
        if (mult) {
            var file = "";
            var files_arr = $(self).prop("files");
            for (var i in files_arr) {
                var name = files_arr[i].name;
                if (typeof (name) == "undefined") {
                    break;
                }
                file += name + "<br />";
            }
        } else {
            var file = self.value;
            file = file.replace(/\\/g, '/').split('/').pop();
        }

        var el = "";
        if(typeof(target) == "string"){
            el = $('.' + target);
        }else{
            el = $(target);
        }
        
        if($(el).prop("tagName").toLowerCase() == 'input'){
            $(el).val(file.replace(/<br \/>/g, '; ')); 
        }else{
            $(el).html(file);
        }
    },
    post(path, params, type, files){
        return new Promise((resolve) => {
            var ct = files ? false : "application/x-www-form-urlencoded; charset=UTF-8";
            var sys = this;
            $.ajax({
                url: path,
                type: 'post',
                data: params,
                contentType: ct,
                processData: files ? false : true,
                headers: { "X-CSRF-TOKEN" : $('meta[name="csrf-token"]').attr('content') },
                dataType: type,
                success: function (response, status) {
                    if (status == "success") {
                        if (response.reason == "token_timeout") {
                            var new_token = response.new_token;
                            $('meta[name="csrf-token"]').attr('content', new_token);
                            sys.post(path, params, type, files);
                        }else if(response.reason == "session_timeout"){
                            console.log(response.message);
                        }else{
                            resolve(response);
                        }
                    }else{
                        resolve(response);
                    }
                },
                error: function(){
                    resolve({
                        reason: 'AJAX request error'
                    });
                }
            });
        });
    },
    loading: {
        start(type){
            $('body').addClass('loading_cursor');
        },
        stop(type){
            $('body').removeClass('loading_cursor');
        }
    },
    q(alias, method, post_data, files){
        var post_data = post_data || {};
        var alias = alias || "";
        var method = method || "";
        post_data.action = "q";
        post_data.alias = alias;
        post_data.method = method;
        return new Promise((resolve) => {
            sys.post(RS + 'ajax', post_data, "json", files).then(r => {
                resolve(r);
            });
        });
    },
    send_form(self, cb){
        this.loading.start();

        var self = self || {};
        var form = $(self).closest('form');
        var form_values = form.serializeArray();
        var post = new FormData();

        var alias = "";
        var method = "";

        for(var i in form_values){
            if(form_values[i].name == 'alias') alias = form_values[i].value;
            if(form_values[i].name == 'method') method = form_values[i].value;
        }

        if(!alias || !method) {
            this.loading.stop();
            return;
        };
        
        for(var i in form_values){
            post.append(form_values[i].name, form_values[i].value);
        }

        var file_inputs = form.find('input[type="file"]');
        $.each(file_inputs, function(i, el){
            var f = el.files;
            if(f.length > 1){
                for(var i in f){
                    post.append(el.name + "[]", f[i]);
                }
            }else{
                post.append(el.name, f[0]);
            }
        });

        this.post(RS + 'ajax', post, "json", true).then(response => {
            if(cb){
                cb(response); 
                return;
            }

            console.log(response);

            if(response.status == "success"){
                if(response.refresh){
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
                }
            }else{

            }
            this.loading.stop();
        });
    },
    reinit_select2(){
        $('.js_select2').each(function() {
            var dropdownParent = $(this).closest('.mw').length ? $(this).closest('.mw').find('.mct') : $(document.body);
            $(this).select2({
                minimumResultsForSearch: 999,
                dropdownParent: dropdownParent
            });
        });
    },
    app_loaded(){

    },
    translit(str, target){
        var target = target || {};
        str = str.toLowerCase();
        str = str.replace(/а/g,'a');
        str = str.replace(/б/g,'b');
        str = str.replace(/в/g,'v');
        str = str.replace(/г/g,'g');
        str = str.replace(/д/g,'d');
        str = str.replace(/е/g,'e');
        str = str.replace(/ё/g,'yo');
        str = str.replace(/ж/g,'zh');
        str = str.replace(/з/g,'z');
        str = str.replace(/и/g,'i');
        str = str.replace(/й/g,'y');
        str = str.replace(/к/g,'k');
        str = str.replace(/л/g,'l');
        str = str.replace(/м/g,'m');
        str = str.replace(/н/g,'n');
        str = str.replace(/о/g,'o');
        str = str.replace(/п/g,'p');
        str = str.replace(/р/g,'r');
        str = str.replace(/с/g,'s');
        str = str.replace(/т/g,'t');
        str = str.replace(/у/g,'u');
        str = str.replace(/х/g,'h');
        str = str.replace(/ф/g,'f');
        str = str.replace(/ц/g,'c');
        str = str.replace(/ч/g,'ch');
        str = str.replace(/ш/g,'sh');
        str = str.replace(/щ/g,'shс');
        str = str.replace(/ъ/g,'');
        str = str.replace(/ы/g,'u');
        str = str.replace(/ь/g,'');
        str = str.replace(/э/g,'e');
        str = str.replace(/ю/g,'yu');
        str = str.replace(/я/g,'ya');
        str = str.replace(/[^a-z,\d,-]/g,'-');
        str = str.replace(/\,/g,'-');
        str = str.replace(/-+/g,'-');
        str = str.replace(/^-+/g,'');
        str = str.replace(/-+$/g,'');
        if(target){
            var el = "";
            if(typeof(target) == "string"){
                el = $(target);
            }else{
                el = $(target);
            }
            if($(el).prop("tagName").toLowerCase() == 'input'){
                $(el).val(str.replace(/<br \/>/g, '; ')); 
            }else{
                $(el).html(str);
            }
        }else{
            return str;
        }
    },
    switch_all_siblings(self){
        var self = self || {};
        var container = $(self).closest('.widget_wrapper');
        if($(self).is(':checked')){
            container.find('input[type="checkbox"]').prop('checked', true)
        }else{
            container.find('input[type="checkbox"]').prop('checked', false)
        }
    },
    validate_email(self){
        let email_val = self.value;
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = re.test(email_val);
        if(valid || !email_val){
            $(self).removeClass('red_border');
        }else{
            $(self).addClass('red_border');
        }
    },
    validate_max(self){
        var self = self || {};
        let max_value = Number($(self).attr('max'));
        let curr_value = Number(self.value);

        if(curr_value > max_value){
            $(self).addClass('red_border');
        }else{
            $(self).removeClass('red_border');
        }
    },
    round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    },
    prepare_form_data(form){
        let form_data = form.serializeArray();
        let post_data = {};
        $.map(form_data, function(n, i){
            post_data[n['name']] = n['value'];
        });
        return post_data;
    }
}