//  get prarameter from url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setBasicInfo(basicInfo) {
    $("[name='user_name']").val(basicInfo.user_name);


}

function toGenderText(strInput) {
    if (strInput === "1") {
        return "男";
    } else if (strInput === "2") {
        return "女";
    }
    return "";
}


layui.use(["form", "table"], function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table;

    const uuid = getParameterByName("uuid");
    console.log(uuid);

    function setBasicInfo(basicInfo) {
        // user_name uid gender age height weight job edu special tel
        $("[name='user_name']").val(basicInfo.user_name);
        $("[name='uid']").val(basicInfo.uid);
        $("[name='gender']").val(toGenderText(basicInfo.gender));
        $("[name='age']").val(basicInfo.age);
        $("[name='height']").val(basicInfo.height);
        $("[name='weight']").val(basicInfo.weight);
        $("[name='job']").val(basicInfo.job);
        $("[name='edu']").val(basicInfo.edu);
        $("[name='special']").val(basicInfo.special);
        $("[name='tel']").val(basicInfo.tel);
    }

    // query get data from uuid
    $.ajax({
        url: `${pds_server}/diagnostics/uuid/${uuid}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            const basicInfo = res.patient_basic_info;
            setBasicInfo(basicInfo);

        },
        error: function (err) {
            console.log(err);
        }
    });

    // set all input readonly
    $("div.layuimini-main input").attr("readonly", "readonly");
    
    
});