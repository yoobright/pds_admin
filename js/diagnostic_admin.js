const decsionText = {
    s1: {
        1: "使用非甾体抗炎药或对乙酰氨基酚",
        2: "使用强阿片类药物",
        3: "使用弱阿片类药物",
        4: "使用抗惊厥类药物或抗抑郁类药物",
        5: "使用强阿片类药物+非甾体抗炎药",
        6: "使用强阿片类药物+抗惊厥类药物/抗抑郁类药物",
        7: "使用弱阿片类药物+抗惊厥类药物/抗抑郁类药物",
    },
    s2: {
        1: "停用即释弱阿片",
        2: "停用缓释弱阿片",
        3: "停用即释弱阿片（增加缓释强阿片剂量）",
        4: "停用任一缓释强阿片",
        5: "增加原有即释弱阿片剂量或停用原有即释弱阿片，换用缓释阿片",
        5.1: "停用原有即释弱阿片，换用缓释阿片",
        6: "停用即释弱阿片，增加缓释弱阿片剂量或停用缓释弱阿片，增加即释弱阿片剂量或停用即释弱阿片及缓释弱阿片，换用强阿片",
        6.1: "停用即释弱阿片，增加缓释弱阿片剂量，或停用即释弱阿片及缓释弱阿片，换用缓释强阿片",
        6.2: "停用缓释弱阿片及即释弱阿片，增加强阿片",
        6.3: "停用缓释弱阿片及即释弱阿片，增加缓释强阿片",
        7: "增加原有即释强阿片剂量，或停用即释强阿片，换用缓释强阿片",
        7.1: "停用即释强阿片，换用缓释强阿片",
        7.2: "增加原有即释强阿片剂量，或原有即释强阿片不变，增加缓释强阿片",
        7.3: "原有即释强阿片不变，增加缓释强阿片",
        7.4: "停用任一即释强阿片，换用缓释强阿片或增加另一即释强阿片剂量",
        8: "停用即释强阿片，增加（原有缓释强阿片+即释强阿片）剂量的25%~50%",
        9: "停用缓释弱阿片和即释强阿片，换用缓释强阿片，或停用缓释弱阿片，增加原有即释强阿片剂量",
        9.1: "停用缓释弱阿片和即释强阿片，换用缓释强阿片",
        9.2: "停用缓释弱阿片，增加即释强阿片剂量，或停用缓释弱阿片，增加缓释强阿片",
        9.3: "停用缓释弱阿片，增加缓释强阿片",
        10: "增加原有缓释强阿片剂量的25%~50%",
        11: "增加原有缓释弱阿片剂量或停用缓释弱阿片，增加强阿片",
        11.1: "增加原有缓释弱阿片剂量或停用缓释弱阿片，换用缓释强阿片",
        11.2: "停用缓释弱阿片，增加强阿片",
        11.3: "停用缓释弱阿片，增加缓释强阿片",
        12: "停用即释弱阿片，增加即释强阿片",
        13: "停用即释强阿片，增加（原有缓释强阿片+即释强阿片）剂量的50%~100%",
        14: "增加原有缓释强阿片剂量的同时，增加即释强阿片剂量",
        15: "停用原有即释弱阿片，换用强阿片",
        15.1: "停用原有即释弱阿片，换用缓释强阿片",
        16: "增加原有缓释强阿片剂量的50%~100%",
        17: "增加弱阿片",
        18: "增加强阿片",
    },
};

function genDecisionText(strData) {
    const data = strData.split('#');
    if (data.length !== 2) {
        return '未知';
    }

    if (data[0] === "s1" || data[0] === "s2") {
        return decsionText[data[0]][data[1]]
    }

    return "未知"
}


function genGenderText(strData) {
    if (strData === "1") {
        return "男"
    }
    if (strData === "2") {
        return "女"
    }

    return ""
}

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
                    gender: genGenderText(r.patient_basic_info.gender),
                    age: r.patient_basic_info.age,
                    recmd: genDecisionText(r.recmd),
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
                });
            },
        };

    $(".demoTable .layui-btn").on("click", function () {
        var type = $(this).data("type");
        active[type] ? active[type].call(this) : "";
    });
});