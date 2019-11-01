layui.use(["layer", "laypage", 'form'], function () {
  //用户总数
  var count;
  //获取用户总数
  $.ajax({
    url: '/hongyi/api/getusercount',
    type: 'GET',
    async: false,
    beforeSend: function (xhr) {
      //添加头部 token 信息
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("token")
      );
    },
    contentType: "application/json",
    success: function (result) {
      if (result.success) {
        count = result.count;
      }
    }
  })
  //初始化分页
  var laypage = layui.laypage;
  //执行一个laypage实例
  laypage.render({
    elem: "elem", //注意，这里的 test1 是 ID，不用加 # 号
    limit: 10,//一行最多显示个数
    count: count, //数据总数，从服务端得到
    jump: function (obj, first) {
      //第一次默认加载第一页
      if (first) {
        obj.curr = 1;
      }
      //获取用户列表
      $.ajax({
        url: "/hongyi/admin/getalluser",
        type: "POST",
        data: JSON.stringify(obj.curr),
        beforeSend: function (xhr) {
          //添加头部 token 信息
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + window.localStorage.getItem("token")
          );
        },
        contentType: "application/json",
        success: function (result) {
          if (result.success) {
            //清空表格内容
            $("tbody").empty();
            //添加内容
            var list = JSON.parse(result.userList);
            for (var i in list) {
              var str = joint(list[i])
              $("tbody").append(str);
            }
            //渲染选中框
            var form = layui.form;
            form.render('checkbox');
          }else{
            layer.msg(result.errMsg);
          }
        },
        error: function(xhr, status, error) {
          layer.msg(xhr.statusText + ":" + xhr.status);
        }
      });
    }
  });
});

//拼接表格内容
function joint(user) {
  var str;
  str = '\
  <tr>\
    <td>\
      <input type="checkbox" name="id" value="1" lay-skin="primary">\
    </td>\
    <td>'+ user.id + '</td>\
    <td>'+ user.username + '</td>\
    <td>'+ user.nickname + '</td>\
    <td>'+ user.sex + '</td>\
    <td>'+ user.phone + '</td>\
    <td>'+ user.email + '</td>\
    <td>'+ user.createTime + '</td>\
    <td class="td-status">\
    ';
  if (user.status == '0') {
    str = str + '\
      <span class="layui-btn layui-btn-normal layui-btn-mini">已启用</span>\
      ';
  } else {
    str = str + '\
      <span class="layui-btn layui-btn-normal layui-btn-mini layui-btn-disabled">已停用</span>\
      ';
  }
  str = str + '\
    </td>\
    <td class="td-manage">\
      <a onclick="member_stop(this,\'10001\')" href="javascript:;" title="启用">\
        <i class="layui-icon">&#xe601;</i>\
      </a>\
      <a title="编辑" onclick="xadmin.open(\'编辑\',\'member-edit.html\',600,400)" href="javascript:;">\
        <i class="layui-icon">&#xe642;</i>\
      </a>\
      <a onclick="xadmin.open(\'修改密码\',\'member-password.html\',600,400)" title="修改密码" href="javascript:;">\
        <i class="layui-icon">&#xe631;</i>\
      </a>\
      <a title="删除" onclick="member_del(this,\'要删除的id\')" href="javascript:;">\
        <i class="layui-icon">&#xe640;</i>\
      </a>\
    </td>\
  </tr>\
  '
  return str;
}
