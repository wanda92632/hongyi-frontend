//检验 token 的有效性
function checkToken() {
  var isEffective;
  $.ajax({
    url: "/hongyi/api/tokencheck",
    type: "POST",
    async: false,
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("token")
      );
    },
    contentType: "application/json",
    success: function(result) {
      //校验失败
      if (result.success) {
        isEffective = true;
      } else {
        isEffective = false;
      }
    },
    error: function(xhr, status, error) {
      isEffective = false;
    }
  });
  return isEffective;
}

//清空 token
function deleteToken() {
  window.localStorage.removeItem("token");
  //跳转登录页面
  loginPage();
}

//跳转到其他页面
function route(url) {
  //判断是否存在 token，其他页面都需要登录后才能访问， 减少了未登录时，访问其他页面的请求次数。
  if (window.localStorage.getItem("token") == undefined) {
    layer.msg("请在登录后访问！", { icon: 4, time: 500 }, function name() {
      loginPage();
    });
  }
  location.href = url;
}

//跳转到登录页面
function loginPage() {
  location.href = "/frontend/admin/login.html";
}
