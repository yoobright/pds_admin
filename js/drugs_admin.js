var $u = utils || require('./utils');


function genTextFromDict(strInput, dict, seq=",") {
    if (strInput === null) {
        return "";
    }
    const inputList = strInput.split(seq);
    if (inputList.length === 0) {
        return "";
    }
    res = []
    for (const input of inputList) {
        if (input in dict) {
            res.push(dict[input]);
        }
    }
    return res.join("、");
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
        elem: "#drug-table",
        // url: "../api/table.json",
        url: `${pds_server}/drugs`,
        parseData: function (res) {
            //res 即为原始返回的数据
            console.log(res);
            const data = [];
            for (const r of res) {
                data.push({
                    drug_id: r.drug_id,
                    drug_name: r.drug_name,
                    spec: r.spec,
                    unit: r.unit,
                    category: genTextFromDict(r.category, $u.Text.drugCategoryText, "/"),
                    high_dose: r.high_dose,
                    exce_freq: r.exce_freq,
                });
            }
            console.log(data);

            return {
                code: 0,
                // msg: "",
                // count: 1,
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

                { field: "drug_id", width: 120, title: "药物ID", sort: true,},
                { field: "drug_name", width: 320, title: "药物名称" },
                { field: "spec", width: 120, title: "药物容量" },
                { field: "unit", width: 80, title: "药物剂量单位" },
                { field: "category", width: 320, title: "药物种类" },
                { field: "high_dose", width: 120, title: "最大剂量" },
                { field: "exce_freq", width: 120, title: "最大频次" },
                // {
                //     title: "操作",
                //     minWidth: 80,
                //     toolbar: "#currentTableBar",
                //     align: "center",
                //     fixed: "right",
                // },
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
        // const objIdx = parseInt($(obj.tr).attr("data-index"));
        // const content_url = `detail.html?uuid=${data.uuid}`;

        // if (obj.event === "detail") {
        //     const index = layer.open({
        //         title: "患者诊断详情",
        //         type: 2,
        //         shade: 0.2,
        //         maxmin: true,
        //         shadeClose: true,
        //         area: ["100%", "100%"],
        //         content: content_url,
        //         btn: ["确定", "关闭"],
        //       });
        //       // $(window).on("resize", function () {
        //       //   layer.full(index);
        //       // });
        //       return false;
        //     // layer.confirm(`${data.uuid}，详情页面！！!`, function (index) {
        //     //     // obj.del();
        //     //     layer.close(index);
        //     // });
        // }
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
                // table.reload("testReload", {
                //     page: {
                //         curr: 1, //重新从第 1 页开始
                //     },
                //     where: {
                //         user_name: name.val(),
                //     },
                //     page: { theme: '#1e9fff' },
                // });
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