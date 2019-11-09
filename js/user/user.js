/**注销登录**/
function logout() {
    $.ajax({
        url: "/hongyi/admin/logout",
        type: "GET",
        contentType: "application/json",
        success: function (result) {
            if (result.success) {
                layer.msg("退出成功");
            } else {
                layer.msg("退出失败:" + result.errMsg);
            }
            deleteToken();
        },
        error: function (xhr, status, error) {
            alert(window.localStorage.getItem("token"));
            layer.msg(xhr.statusText + ":" + xhr.status);
        }
    });
    return false;
}

/**修改用户状态**/
function modifyUserStatus(userId, operationCode) {
    // operation 0：启用，1：禁用
    var data = {"userId": userId,"operationCode": operationCode};
    var url = '/hongyi/admin/disableduserstatus';
    $.post(url, JSON.stringify(data));
}