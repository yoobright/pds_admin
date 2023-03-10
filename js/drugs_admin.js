var $u = utils || require('./utils');

genTextFromDict = $u.Text.genTextFromDict;

function genCategoryEle(category) {
    const dict = $u.Text.drugCategoryText;
    const strInput = category;
    const seq = "/";

    if (strInput === null) {
        return "";
    }
    const inputList = strInput.split(seq);
    if (inputList.length === 0) {
        return "";
    }

    const res = []
    for (const input of inputList) {
        if (input in dict) {
            const name = dict[input];
            if (input.startsWith('A')) {
                res.push(`<span class="layui-badge layui-bg-green">${name}</span>`);
            }
            else if (input.startsWith('B')) {
                res.push(`<span class="layui-badge layui-bg-blue">${name}</span>`);
            }
            else if (
                input.startsWith('C')
                || input.startsWith('D')
                || input.startsWith('E')
                || input.startsWith('F')
                || input.startsWith('G')
                || input.startsWith('H')
                || input.startsWith('I')
                || input.startsWith('J')
            ) {
                res.push(`<span class="layui-badge layui-bg-red">${name}</span>`);
            }
            else {
                res.push(`<span class="layui-badge-rim">${name}</span>`);
            }

        }
    }

    return res.join(" ");

}


layui.use(["transfer", "form", "table"], function () {
    var $ = layui.jquery,
        transfer = layui.transfer,
        form = layui.form,
        table = layui.table;

    const tableData = [];

    const tableIns = table.render({
        elem: "#drug-table",
        // url: "../api/table.json",
        url: `${pds_server}/drugs`,
        parseData: function (res) {
            //res 即为原始返回的数据
            // console.log(res);
            const data = [];
            for (const r of res.data) {
                const categoryEle =
                    data.push({
                        drug_id: r.drug_id,
                        drug_name: r.drug_name,
                        spec: r.spec,
                        unit: r.unit,
                        category: r.category,
                        high_dose: r.high_dose,
                        exce_freq: r.exce_freq,
                    });
            }
            // console.log(data);

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

                { field: "drug_id", width: 100, title: "药物ID", sort: true },
                { field: "drug_name", width: 320, title: "药物名称" },
                { field: "spec", width: 120, title: "药物容量" },
                { field: "unit", width: 80, title: "药物剂量单位" },
                {
                    field: "category", width: 320, title: "药物种类", templet: function (d) {
                        // console.log(d.LAY_INDEX); //得到序号。一般不常用
                        // console.log(d.LAY_COL); //得到当前列表头配置信息（layui 2.6.8 新增）。一般不常用
                        //得到当前行数据，并拼接成自定义模板
                        return genCategoryEle(d.category);
                    }
                },
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
        limits: [10, 20, 50, 100, 200, 500],
        limit: 20,
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
                if (name.val().trim() === "") {
                    layer.msg("请输入药品名");
                    return;
                }

                //执行重载
                tableIns.reload({
                    page: {
                        curr: 1, //重新从第 1 页开始
                        theme: '#1e9fff'
                    },
                    where: {
                        drug_name: name.val(),
                    },
                });
            },
            refresh: function () {
                location.reload();
            },
            add_drug: function () {
                console.log("add");
                const dialogId = "#drug_add_dialog";
                layer.open({
                    type: 1,
                    title: '添加药品',
                    content: $(dialogId),
                    area: ['800px', '350px'], //自定义文本域宽高
                    success: function (layero, index) {
                        $("#addReset").click();
                        $("#highDoseUnit").text("");
                        $("#drug_category_input").prop("title", "请选择药物种类");
                    },
                    btn: ['确定', '取消'],
                    yes: function (index, layero) {
                        console.log("yes");
                        // $(dialogId).submit();
                        layer.msg("暂未实现！！！")
                        // $("#addSubmit").click();
                        // layer.close(index);

                    },
                    btn2: function (index, layero) {
                        // console.log("no");
                        layer.close(index);
                    }
                });

            }
        };

    $(".demoTable .layui-btn").on("click", function () {
        var type = $(this).data("type");
        active[type] ? active[type].call(this) : "";
    });


    form.on("radio(drugUnit)", function (data) {
        const unit = `${data.value}/d`;
        console.log(unit);
        $("#highDoseUnit").text(unit);
    });

    const categoryData = Object.keys(utils.Text.drugCategoryText).map((k) => {
        return { value: k, title: utils.Text.drugCategoryText[k] };
    });

    transfer.render({
        elem: "#durg_category_select",
        title: ["候选类别", "已选择类别"],
        showSearch: true,
        data: categoryData,
        id: "keyCategorySelect",
    });

    $("#category-edit").click(function () {
        const dialogId = "#drug_category_dialog";
        layer.open({
            type: 1,
            title: '药品种类',
            content: $(dialogId),
            // area: ['800px', '350px'], //自定义文本域宽高
            success: function (layero, index) {
                const category = $("#drug_category_input").val();
                const categoryArr = category.split("/");
                transfer.reload("keyCategorySelect", {
                    value: categoryArr,
                });
            },
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                const getData = transfer.getData("keyCategorySelect");
                const category = getData.map((d) => d.value).join("/");
                const title = getData.map((d) => d.title).join("/");
                $("#drug_category_input").val(category);
                $("#drug_category_input").prop("title", title);
                console.log(getData);
                console.log("yes");
                layer.close(index);
            },
            btn2: function (index, layero) {
                layer.close(index);
            }
        });

    });
});