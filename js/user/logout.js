//用户登录
$(function () {
    $("#logout").click(function () {
        $.ajax({
            url: "/hongyi/admin/logout",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
            },
            contentType: "application/json",
            success: function (result) {
                if (result.success){
                    layer.msg("推出成功")
                } else {
                    layer.msg('退出失败:'+result.errMsg)
                }
            },
            error: function (xhr, status, error) {
                alert(window.localStorage.getItem('token'))
                layer.msg(xhr.statusText + ":" + xhr.status);
            }
        });
    });
});
