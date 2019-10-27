//用户登录
$(function () {
    layui.use('form', function () {
        var form = layui.form;
        //监听提交
        form.on('submit(login)', function (data) {
            var param = data.field;
            $.ajax({
                url: '/hongyi/admin/login',
                type: 'POST',
                // 后端通过 @HttpRequestBody直接接收
                data: JSON.stringify(param),
                contentType: 'application/json',
                success: function (result) {
                    if (result.success) {
                        layer.msg('登录成功');
                        //存储 token
                        alert(result.token);
                        window.localStorage.setItem('token', result.token)
                        //页面跳转
                        location.href='/frontend/admin/index.html';
                    } else {
                        layer.msg('登录失败');
                        layer.msg(JSON.stringify(result.errMsg));
                    }
                },
                error: function (xhr, status, error) {
                    layer.msg(xhr.statusText+':'+xhr.status)
                }
            });
            return false;
        });
    });
})