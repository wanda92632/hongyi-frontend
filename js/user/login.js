//用户登录
layui.use("form", function() {
  //判断是否已登录
  if (window.localStorage.getItem("token") != undefined) {
    if (checkToken()) {
      route('/frontend/admin/index.html');
    }
  }

  var form = layui.form;
  //监听提交
  form.on("submit(login)", function(data) {
    var param = data.field;
    $.ajax({
      url: "/hongyi/admin/login",
      type: "POST",
      // 后端通过 @HttpRequestBody直接接收
      data: JSON.stringify(param),
      contentType: "application/json",
      success: function(result) {
        if (result.success) {
          //存储 token
          window.localStorage.setItem("token", result.token);
          layui.data;
          //页面跳转
          route('/frontend/admin/index.html');
        } else {
          layer.msg("登录失败:" + result.errMsg);
        }
      },
      error: function(xhr, status, error) {
        layer.msg(xhr.statusText + ":" + xhr.status);
      }
    });
    return false;
  });
  
});
