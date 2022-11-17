var $u = utils || require('./utils');

layui.use(["form", "table"], function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table;

    const tableData = [];
    // const blankRowData = {
    //   create_time: "",
    //   user_name: "",
    //   uid: "",
    //   gender: "",
    //   age: "",
    //   recmd: "",
    //   uuid: ""
    // };
    // const tableMax = 1;
    table.render({
        elem: "#diagnostic-table",
        // url: "../api/table.json",
        url: `${pds_server}/diagnostics`,
        parseData: function (res) {
            //res 即为原始返回的数据
            console.log(res);
            const data = [];
            for (const r of res.data) {
                data.push({
                    create_time: r.created_at,
                    user_name: r.patient_basic_info.user_name,
                    uid: r.patient_basic_info.uid,
                    gender: $u.Text.genGenderText(
                        r.patient_basic_info.gender),
                    age: r.patient_basic_info.age,
                    recmd: $u.Text.genDecisionText(r.recmd),
                    uuid: r.uuid,
                });
            }
            console.log(data);

            return {
                code: 0,
                msg: "",
                count: res.total,
                data: data,
            };
        },

        toolbar: "#toolbarDemo",
        defaultToolbar: [
            "filter",
            "exports",
            "print",
            {
                title: "提示",
                layEvent: "LAYTABLE_TIPS",
                icon: "layui-icon-tips",
            },
        ],
        // width: 1600,
        cols: [
            [
                // { type: "checkbox", width: 50 },
                {
                    field: "create_time",
                    width: 320,
                    title: "提交时间",
                    sort: true,
                },
                { field: "user_name", width: 120, title: "患者名称" },
                { field: "uid", width: 120, title: "uid" },
                { field: "gender", width: 80, title: "性别" },
                { field: "age", width: 80, title: "年龄" },
                { field: "recmd", width: 400, title: "推荐决策" },
                { field: "uuid", width: 320, title: "uuid", hide: true },
                {
                    title: "操作",
                    minWidth: 80,
                    toolbar: "#currentTableBar",
                    align: "center",
                    fixed: "right",
                },
            ],
        ],
        data: tableData,
        limits: [10, 20, 50, 100],
        limit: 10,
        page: { theme: '#1e9fff' },
        skin: "row",
        even: true,
        totalRow: true,
        id: "testReload"
    });

    table.on("tool(currentTableFilter)", function (obj) {
        const data = obj.data;
        console.log(data);

        // const currentData = layui.table.cache["currentTableId"];
        const objIdx = parseInt($(obj.tr).attr("data-index"));
        const content_url = `detail.html?uuid=${data.uuid}`;

        if (obj.event === "detail") {
            const index = layer.open({
                title: "患者诊断详情",
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ["100%", "100%"],
                content: content_url,
                btn: ["确定", "关闭"],
              });
              // $(window).on("resize", function () {
              //   layer.full(index);
              // });
              return false;
            // layer.confirm(`${data.uuid}，详情页面！！!`, function (index) {
            //     // obj.del();
            //     layer.close(index);
            // });
        }
    });

    var $ = layui.$,
        active = {
            reload: function () {
                const name = $("#search-name");
                if (name.val() === "") {
                    layer.msg("请输入姓名");
                    return;
                }

                //执行重载
                table.reload("testReload", {
                    page: {
                        curr: 1, //重新从第 1 页开始
                    },
                    where: {
                        user_name: name.val(),
                    },
                    page: { theme: '#1e9fff' },
                });
            },
            refresh: function () {
                location.reload();
            }
        };

    $(".demoTable .layui-btn").on("click", function () {
        var type = $(this).data("type");
        active[type] ? active[type].call(this) : "";
    });
});