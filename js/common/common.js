layui.use('layer', function(){
    $.ajax({
        url: "/hongyi/permissioncheck/tokencheck",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
        },
        contentType: "application/json",
        success: function (result) {
            if (!result.success) {
                //校验失败返回登录页面
                location.href = '/frontend/admin/login.html';
            }
        },
        error: function (xhr, status, error) {
            alert(window.localStorage.getItem('token'));
            layer.msg(xhr.statusText + ":" + xhr.status);
        }
    });
})
