/**验证登录的有效性**/
layui.use("layer", function () {
    if (!checkToken()) {
        layer.msg("请重新登录！" + checkToken(), {icon: 4, time: 500}, function name(params) {
            //校验失败清空token,返回登录页面
            deleteToken();
        });
    }
});